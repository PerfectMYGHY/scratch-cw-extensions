import re  
from translateapi import translate  # 假设这是你的翻译API函数  
  
def custom_translate(text,lang_from = 'en',lang_to = 'zh-cn',wait=0):  
    # 使用正则表达式查找方括号内的内容  
    matches = re.findall(r'\[([^\[\]]*?)\]', text)  
      
    # 替换方括号内的内容为占位符，以便后续翻译  
    placeholders = {match: f'{{%{i}}}' for i, match in enumerate(matches)}  
    placeholders2 = {match: f'{{% {i}}}' for i, match in enumerate(matches)}  
    for match, placeholder in placeholders.items():  
        text = text.replace(f'[{match}]', placeholder)
      
    # 调用API翻译替换后的文本  
    translated_text = translate(text,lang_from = lang_from,lang_to = lang_to,wait=wait)[0]
      
    # 将翻译后的文本中的占位符替换回原始方括号内容  
    for original, placeholder in placeholders.items():  
        translated_text = translated_text.replace(placeholder, f'[{original}]') 
    for original, placeholder in placeholders2.items():  
        translated_text = translated_text.replace(placeholder, f'[{original}]') 
      
    return [translated_text]
  
# 示例文本  
text_to_translate = "pen [HSV]"  
  
# 调用自定义翻译函数  
translated_text = custom_translate(text_to_translate)[0]  # 假设'zh-CN'是中文的目标语言代码  
  
print(translated_text)