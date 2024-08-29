from translateapi import translate as _translate
import tqdm

def translate(text,lang_from = 'en',lang_to = 'zh-cn',wait=0):
    if len(text.strip()) == 0:
        return text
    return _translate(text,lang_from = lang_from,lang_to = lang_to,wait=wait)[0]
  
# 定义源和目标文件路径  
FROM = 'extensions/box2d.js'  
TO = 'box2d.js'  

print("读取文件...")

# 读取源文件  
with open(FROM, 'r', encoding='utf-8') as file:  
    content = file.read()

print("预处理内容...")
  
# 简化处理：只考虑单行注释（//）和多行注释（/* ... */）  
# 注意：这个处理很基础，不包括嵌套注释和字符串中的注释  
lines = content.split('\n')  
translated_lines = []
  
in_multiline_comment = False  
  
for line in tqdm.tqdm(lines,desc="正在处理"):  
    translated_line = []  
    words = line.split()  
    translated_comment = ''  
  
    # 复制整行，但跳过翻译代码部分  
    translated_line_no_comments = []  
  
    for word in words:  
        if in_multiline_comment:  
            if '*/' in word:  
                translated_comment += translate(word.split('*/')[0], 'en', 'zh-cn',1) + '*/'  
                in_multiline_comment = False  
                translated_line.append(translated_comment)  
                translated_line_no_comments.append('/*' + translated_comment.split('*/')[0] + '*/')  
            else:  
                translated_comment += translate(word, 'en', 'zh-cn',1)  
        elif '//' in word:
            # print(word,word.split('//'),word.split('//')[1])
            # 单行注释  
            translated_comment = translate(word.split('//')[1], 'en', 'zh-cn',1)  
            translated_line.append(word.split('//')[0].strip() + '//' + translated_comment)  
            translated_line_no_comments.append(word.split('//')[0].strip())  
        elif '/*' in word:  
            # 多行注释开始  
            translated_comment = translate(word.split('/*')[1].split('*/')[0], 'en', 'zh-cn',1)  
            if '*/' in word:  
                # 注释在同一行结束  
                translated_line.append('/*' + translated_comment + '*/')  
                translated_line_no_comments.append('/*' + word.split('/*')[1].split('*/')[0] + '*/')  
                in_multiline_comment = False  
            else:  
                # 注释跨越多行  
                in_multiline_comment = True  
                translated_comment = '/*' + translated_comment  
        else:  
            translated_line_no_comments.append(word)  
  
    translated_line.extend(translated_line_no_comments)  
    translated_lines.append(' '.join(translated_line).strip())
    with open(TO, 'w', encoding='utf-8') as file:
        file.write('\n'.join(translated_lines))

print("写入文件...")

# 写入翻译后的文件  
# with open(TO, 'w', encoding='utf-8') as file:  
#     file.write('\n'.join(translated_lines))  
  
print("翻译完成，已保存到", TO)