# 使用有道翻译API来翻译

import requests
import time
from .utils.AuthV3Util import addAuthParams
import traceback
import json

def loadJSON(path:str,encoding="utf-8"):
    with open(path,"r",encoding=encoding) as rf:
        data = rf.read()
    return json.loads(data)

information = loadJSON("env.json") # 从JSON加载有道翻译的密匙

# 您的应用ID
APP_KEY = information["APP_KEY"]
# 您的应用密钥
APP_SECRET = information["APP_SECRET"]


def createRequest(q,lang_from = 'en',lang_to = 'zh-cn',wait=0): # q为要翻译的字符串，lang_from为翻译源语言，lang_to为要翻译成的语言，wait为翻译后等待秒数（主要用于频繁访问时设置间隔，防止发生错误，频繁访问时最好设置为1）
    '''
    note: 将下列变量替换为需要请求的参数
    '''
    # print(q)

    data = {
        'q': q, 
        'from': lang_from, 
        'to': lang_to, 
        # 'vocabId': vocab_id
    }

    addAuthParams(APP_KEY, APP_SECRET, data)

    header = {'Content-Type': 'application/x-www-form-urlencoded'}
    res = doCall('https://openapi.youdao.com/api', header, data, 'post')
    # print(str(res.content, 'utf-8'))
    time.sleep(wait)
    # print(res.json())
    j = res.json()
    if "translation" in j:
        return j["translation"]
    else:
        try:
            raise RuntimeError(j)
        except:
            print("\n出现错误：")
            print(traceback.format_exc().strip())
            return [q]

def doCall(url, header, params, method):
    if 'get' == method:
        return requests.get(url, params)
    elif 'post' == method:
        return requests.post(url, params, header)

# 网易有道智云翻译服务api调用demo
# api接口: https://openapi.youdao.com/api
if __name__ == '__main__':
    ret = createRequest('Hello, how are you?')
    print(ret)
