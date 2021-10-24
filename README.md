# react-learn
> Joey's react learn demos and notes,基于[react.js小书](https://hyf.js.org/react-naive-book)整理学习笔记，记录学习心得。（由于markdown局限性，当前文档不完整，完整版移步[语雀](https://www.yuque.com/yuqueyonghugeabue/edv3vd/eui517)查看）
## 前三节（前端组件化）讲了什么？
作为react入门教程，作者并没有一上来就讲解react的语法，而是先以一个点赞按钮为例，给读者强调了前端组件化的重要性，并且循序渐进地讲解了具体做法：
1. 按照DOM开发的思路，如果需要一个点赞按钮（likeButton），只要直接在HTML中插入相关的元素，并为其添加点击监听即可。但是这样的做法不具备任何可复用性，也不能称之为“组件”。所以我们创建一个’likeButton’类，并为其添加一个render方法，帮助我们向页面中插入一个DOM元素，并添加监听。这样我们就实现了一个简单的组件，如果要复用的话，只需要实例化并调用实例方法即可。
2. 当前的做法是：为组件类创建一个方法去根据数据操作DOM元素。这样的做法在简单场景下不会出问题，但是当组件依赖很多数据时，我们需要进行的DOM操作会非常多，所以手动编写函数去维护**数据**与**视图**的关系是不明智的。这里提供了一个解决方案（亦即React.js的做法）：每当数据改变，我们就重新调用render方法创建一个新的DOM结构，而函数只需要专注改变数据即可。这样我们就可以减少手动操作DOM的次数。
3. 现在一个按钮组件类基本完成，接下来要考虑的是抽象出一个组件类。回顾按钮组件，我们用一个state来维护按钮当前的状态，以确定当前视图应当显示的是“点赞”还是“取消”；一个setState方法，在按钮被点击时更改state；一个render方法，以字符串方式确定视图。综上，一个公共组件类需要：state属性，用来维护组件的状态和数据；setState方法，在某些时候改变state；renderDOM方法，结合render方法来渲染视图。
总结：作者用了三个章节，把读者一步一步引入了react的思想中：前端组件化（从而实现复用性）+数据驱动视图（state决定DOM）+数据单向流动（与Vue不同，视图无法直接更改state，只能setState改变state然后重新render）。接下来，进入React的世界！
## 关于JSX和react-dom
JSX的本质是一个JavaScript对象，用以表述一个HTML元素：标签、属性、子元素。我们编写的JSX会被react用React.createElement编译成JavaScript对象，然后再通过react-dom将其渲染到页面上。
Q:为什么不直接把JSX编译成DOM，而是中间维护一个JS对象？
原因有两点：首先，我们不一定会渲染到页面上，也有可能是canvas或者APP（如上图所示）；其次，JS对象其实就是一个virtual dom，当数据更改时能提高效率，减少重排重绘的次数。
## 关于render函数
react中一切皆组件，如果以类的方式去编写组件，则组件类中必须包含一个render函数，render函数必须返回一个JSX元素，而且返回的JSX的最外层不能有JSX并列（最外层必须只有一个JSX）。在JSX中可以用一个{}来包含JS表达式（毕竟JSX本质还是JS），也可以以变量的形式插入JSX。
```JavaScript
class Header extends Component {
	render() {
    let flag = true
  	const aCom = <div>something</div>
    const aClassName = 'aClass'
    return (
      <div className={aClassName}>
      	{flag?aCom:null}
      </div>
    )
  }
}
```
## 关于自定义组件与事件监听
* 自定义组件标签必须以大写字母开头，以区分于HTML标签。
* 添加监听很容易，直接添加onClick之类以on开头的属性即可：这是react重写的、兼容所有浏览器的API。
* 没有经过处理的话，这些监听只能加在HTML元素上，不能添加在自定义组件上。
* 所有的监听都内置了event对象。
* **关于事件的this** react调用你传给他的函数的时候，是直接调用的，而不是通过对象方法的方式调用的，所以不能直接拿到this对象，而需要用bind将函数绑定到当前this上。
## 关于state和props
### state和setState
* state用于维护状态（数据），以作为视图的数据来源。修改state必须用setState，这是因为：每次修改state，reate内部都需要执行render函数去更新视图，而只有用setState改变state，react才能知道“state变化了”
* setState是异步执行的，所以如果想要在setState之后获取新的state会失败。该场景下可以把一个函数作为setState的参数，并且该回调的参数是preState（即更新后的状态），在回调中即可获取最新state
* 异步执行的好处是：多次setState，一次reRender。
### props
* 可以给组件类添加一个静态属性 defaultProps，作为props默认值，以供组件在没有props时使用
* props不可改变
* 可以通过父组件的setState触发父组件state（子组件props）的改变和重新渲染，即可重新向子组件传入新的props
### 区分state和props
* state用于控制自身：自身组件内初始化，自身组件内可改变，外部不可改变
* props是外部传入的数据，自身不可改变。
* 尽量多用props，尽量少用state：没有state的叫做无状态组件，反之叫有状态组件。无状态组件可以降低代码维护难度，增加可维护性。无状态组件可以采用函数的方式来编写（函数式组件）
```javascript
const HelloWorld = (props) => {
  const sayHi = (event) => alert('Hello World')
  return (
    <div onClick={sayHi}>Hello World</div>
  )
}
```
