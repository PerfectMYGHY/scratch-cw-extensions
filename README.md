# extensions

仅对所有扩展进行了汉化处理。如果你自己想要汉化，请先从`Turbowarp`上下载`extensions`存储库，然后吧它的`extensions`和`translations`文件夹复制到本存储库目录中，然后修改`translater.py`让其使用你自己的API去翻译每个代码块。

然后运行下面命令开始翻译（时间不短）（请安装`tqdm`、`requests`库并最好使用`Python 3.8.5`）：

```
python translater.py
```

原来的自述文件：

---

# TurboWarp Extension Gallery

User-contributed unsandboxed extension gallery for TurboWarp.

https://extensions.turbowarp.org/

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Extensions (in the `extensions` folder) will have a comment at the top of the file describing the license for the code. In the past [MIT](./licenses/MIT.txt) was the default, however now [MPL-2.0](./licenses/MPL-2.0.txt) is recommended. Some extensions may contain a mix of several.

Sample projects (in the `samples` folder) are licensed under [CC-BY 4.0](./licenses/CC-BY-4.0.txt).

Everything else, such as the extension images, development server, and website are licensed under the [GNU General Public License version 3](licenses/GPL-3.0.txt).

See [images/README.md](images/README.md) for attribution information for each image.
