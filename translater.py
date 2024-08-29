# 使用有道翻译将所有扩展积木翻译为中文

from translateapi import translate, translateCode
import json
import re
import os
import subprocess
import tqdm
  
# 正则表达式匹配 text: 后面的由引号包裹的字符串  
pattern_text = re.compile(r'text:\s*("[^"]*")(?=[,;])', re.MULTILINE)  
  
# 正则表达式匹配 name: 后面紧跟着由引号包裹的字符串（确保没有其他内容）  
pattern_name = re.compile(r'name:\s*("[^"]*")(?=\s*[,;])', re.MULTILINE)  
  
# 替换函数，将匹配的字符串包装成 Scratch.translate(...)  
def replace_with_translate(match):  
    original_string = match.group(1)  # 提取引号内的字符串  
    return f'{match.group(0).split(":")[0]}: Scratch.translate({original_string})'  # 保留字段名并替换值
  
def mod_content(data):
    # 使用正则表达式替换所有匹配的字符串（先处理name，因为text的正则也可能匹配到name的情况）  
    modified_content = pattern_name.sub(replace_with_translate, data)  
    modified_content = pattern_text.sub(replace_with_translate, modified_content)  
    return modified_content
  
# # 打印修改后的内容  
# print(modified_content)
# exit(1)

lists = "extensions/extensions.json"
dist = "translations/extension-runtime.json"
root = 'extensions'

# 正则表达式匹配 getInfo 函数并提取返回的对象内容  
# 注意：这个正则表达式假设了返回的对象直接跟在 return 关键字后面，并且没有嵌套  
pattern = re.compile(r'getInfo\(\)\s*{\s*return\s*({.*?});', re.DOTALL)  

# 正则表达式匹配 Scratch.translate 调用并替换为第一个参数（假设没有嵌套或复杂逻辑）  
pattern2 = re.compile(r'Scratch\.translate\("([^"]*)"\)') 

def getInfo(path):
    # 使用subprocess模块运行JavaScript文件并捕获输出  
    result = subprocess.run(['node', 'getter.js', path], capture_output=True, text=True)  
    print(result.stdout)
    # 从输出中解析JSON字符串  
    data = json.loads(result.stdout)

    return data

def loadExtenedJSON(json_string):  
    # 去除单行注释（// ...）
    json_string = re.sub(r'//.*', '', json_string, flags=re.MULTILINE)
      
    # 去除多行注释（/* ... */）
    # 注意：这个正则表达式不会处理嵌套的多行注释
    json_string = re.sub(r'/*[^*]*\*+([^/*][^*]*\*+)*/', '', json_string, flags=re.MULTILINE)
      
    # 转换JSON字符串为Python
    data = json.loads(json_string)
    return data

with open(lists,"r") as rf:
    li = loadExtenedJSON(rf.read())

true = True
false = False
null = None
# 下面数据是由 在Scratch创世界编辑器控制台中执行 getter.js 中的代码后得到的结果
tasks = loadExtenedJSON("generated-block-data.json")

translated = {}
WAIT = 1

if os.path.isfile("temp.json"):
    print("恢复记录")
    with open("temp.json","r",encoding="utf-8") as rf:
        translated = json.loads(rf.read())

for idx,task in enumerate(tqdm.tqdm(tasks,desc="总进度")):
    name = li[idx]
    # print(idx,name,task["id"])
    # 修改原始文件以保证 翻译 函数的调用
    path = f"{root}/{name}.js"
    with open(path,"r",encoding="utf-8") as rf:
        data = rf.read()
    if "Scratch.translate" in data:
        print("该模块已有翻译")
        continue
    data = mod_content(data)
    with open(path,"w",encoding="utf-8") as wf:
        wf.write(data)
    # 翻译扩展名
    if "name" in task:
        if f'{name}@_{task["name"]}' not in translated:
            translated[f'{name}@_{task["name"]}'] = translate(task["name"],wait=WAIT)[0]
        else:
            print("跳过翻译扩展名")
    else:
        print("这物没有name，跳过翻译")
    # 翻译积木块
    for block in tqdm.tqdm(task["blocks"],desc="翻译积木"):
        if block == "---" or "text" not in block:
            continue
        # print(block,name)
        if f'{name}@_{block["text"]}' not in translated:
            translated[f'{name}@_{block["text"]}'] = translateCode(block["text"],wait=WAIT)[0]
        else:
            print(f'跳过翻译积木ID {name}@_{block["text"]}')
    if "menus" in task:
        for key, value in tqdm.tqdm(task["menus"].items(),desc="翻译菜单"):
            if "items" not in value:
                continue
            if type(value["items"]) == str:
                continue
            for item in tqdm.tqdm(value["items"],desc="翻译菜单项"):
                if type(item) == str:
                    continue
                if f'{name}@_{item["text"]}' not in translated:
                    translated[f'{name}@_{item["text"]}'] = translate(item["text"],wait=WAIT)[0]
                else:
                    print(f'跳过菜单项ID {name}@_{item["text"]}')
    with open("temp.json","w",encoding="utf-8") as wf:
        wf.write(json.dumps(translated,ensure_ascii=False))

with open(dist,"r",encoding="utf-8") as rf:
    data = json.loads(rf.read())

translated.update(data["zh-cn"])
data["zh-cn"] = translated

with open(dist,"w",encoding="utf-8") as wf:
    wf.write(json.dumps(data,ensure_ascii=False))