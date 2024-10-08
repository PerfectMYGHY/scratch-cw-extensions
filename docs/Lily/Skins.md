# Skins

这个扩展允许你将图像加载并显示到精灵上，作为造型。

在这个扩展中，“造型”是可以替换精灵外观的图像。

与服装不同，造型不会在项目打开时加载。相反，造型是在项目运行时通过积木加载的。

## 加载造型

造型可以通过三种不同的方式创建。每种方式都需要为造型命名，之后其他积木将通过该名称引用这个造型。

加载具有相同名称的造型将覆盖该造型的数据。任何使用此造型的精灵现在将显示新的造型。

---

```scratch
创建SVG造型 [<svg />] 为 [my skin] :: #6b56ff
```
第一种方式是通过SVG标记数据创建一个新的造型。这种方式的优点是加载速度比其他方式快。显而易见的缺点是，与其他两种积木不同，它只能用于SVG。

---

```scratch
从 (造型 1 v) 加载造型并命名为 [my skin] :: #6b56ff
```
第二种方式是从服装中加载造型。

需要注意的是，为了让这个积木在打包环境中正常工作，需要在打包器中禁用高级选项“加载后移除原始资产数据以节省RAM”。**你不需要在编辑器中执行此操作。**

如果你打算打包项目，由于这个原因，我们不建议使用这个积木。**这个扩展中的其他积木都不需要禁用该选项。**

---

```scratch
从URL [https://...] 加载造型并命名为 [my skin] :: #6b56ff
```
最后一种方式是通过URL加载造型。这个积木允许你加载任何位图图像以及SVG。

```scratch
从URL (舞台快照 :: #9966ff) 加载造型并命名为 [my skin] :: #6b56ff
```
虽然这个积木可以使用网站URL，但它主要是为了与数据URI一起使用。试着与“Looks Plus”扩展中的“舞台快照”积木一起使用。

对于最后两个积木，这个积木会暂停脚本片刻以加载造型。在你的脚本中将它们视为“等待”积木，不要指望它们立即完成。

## 使用造型

```scratch
将 (自己 v) 的造型设置为 [my skin] :: #6b56ff
```
只要你事先加载了造型，就可以用这个积木将造型应用到精灵上。造型可以应用到多个精灵/克隆体上。

使用“自己”选项将造型应用到积木运行的精灵上：如果积木在克隆体中运行，它将造型应用到克隆体上。**不要将“自己”与精灵的名字混淆。**

当项目停止时，造型将自动从所有精灵上移除。

---

```scratch
恢复 (自己 v) 的造型 :: #6b56ff
```
你可以使用“恢复 造型”积木移除精灵的造型。这将从特定的精灵上移除造型。

---

```scratch
用造型恢复目标 [my skin] :: #6b56ff
```
你可以使用“恢复应用了造型的目标”积木从所有应用了造型的精灵上移除造型。在此上下文中，“目标”指的是“精灵”。

## 删除造型

即使项目停止后，加载的造型仍然存在。为了真正删除一个造型，有两种方法。

---

```scratch
删除造型 [my skin] :: #6b56ff
```
删除指定的造型，并重置任何应用了该造型的精灵。

---

```scratch
删除所有造型 :: #6b56ff
```
删除所有已加载的造型，并重置所有应用了任何造型的精灵。

## 其他积木

```scratch
< 造型 [my skin] 已加载? :: #6b56ff>
```
检查造型是否真正加载。在积木加载完造型之后，这个值会变为true。

---

```scratch
( 造型 [my skin] 的 (width v) :: #6b56ff)
```
获取造型的宽度/高度。值是四舍五入的。

---

```scratch
((自己 v) 的当前造型 :: #6b56ff)
```
应用到指定精灵的造型的名称。
