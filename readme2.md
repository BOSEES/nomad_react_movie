# 노마드코더 리엑트 무비앱 고고

## React Life Cycle
React는 Component는 상위 component에서 받은 props 를 input으로 하고 React를 구성하는 가장 작은 단위인 Element 를 output으로 하는 함수!!이다.

React를 사용하면 각 component 단위로 UI를 화면에 보이게 하고, 다른 UI로 바꾸고, 현재 보이는 UI를 화면에서 없앨 수 있다. 따라서 각각의 Component들은 생성 -> 업데이트 -> 제거 단계를 차례로 겪는 생명주기(Life Cycle)를 가지고 있다.

본 포스팅에서는 Component Life Cycle과 관련하여 각 단계에서 Component는 어떤 일을 하고 어떻게 활용할 수 있을 지에 대한 이야기를 하고자 한다.

다음의 문서를 참고하였다.

React Life Cycle : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

React.Component : https://ko.reactjs.org/docs/react-component.html

## Mounting(생성)
Component가 새롭게 생성되는 시점이다. Component 함수가 실행되고 결과물로 나온 Element들이 가상 DOM에 삽입되고 실제 DOM을 업데이트하기까지의 과정이다.

    import React, { Component } from 'react';

    class Login extends Component {
    }
React Component 를 정의하기 위해서는 주로 class를 사용한다. (요샌 Functional component를 더 많이 사용하는 추세라고는 한다….) 위의 코드와 같이 React.Component를 상속받는 class로 정의해야 한다.

## constructor

- 최초에 Component가 Mount되기 전에 실행이 된다. 주로 다음과 같은 역할을 한다.

- this.state 로 state 값을 선언/초기화
각종 Event 처리 Binding
아래와 같이 코드를 사용한다.

      class Login extends Component {
      constructor(props) {
        super(props);
        
        this.state = {
          isLogin = true,
          userInfo = null
        };
        this.handleBtnClick = this.handleBtnClick.bind(this);
      }
    }
constructor를 정의할 때 주의해야 할 점은

constructor를 사용하고자 하는 목적이 없다면 작성하지 않아도 되는 코드이다.
constructor를 사용한다면, super(props) 를 반드시 호출하여 this.props 를 정의해 주어야 한다. 버그가 발생할 수 있다.
constructor 내부에서 setState 등의 업데이트를 실행하지 말자. 필요하다면 state에서 정의하면 된다. Mount 되기 전에 업데이트를 하는 것은 바람직하지 않다.
즉, mount되기 전에 이미 결정되는 state는 constructor에서 미리 정해 두어야 하고, 그렇지 않은 state는 mount가 된 후 setState를 통해서 이루어져야 한다.

그래서 비동기 작업은 componentDidMount에서 하나보다..

render
render() 는 최종적으로 component에서 작업한 결과물을 return하는 method이다. 그래서 component 라면 반드시 있어야 하는 method이다. render의 결과물로 나올 수 있는 것들은 다음과 같다.

React Element : 보통 JSX 를 사용하여 작성한다. * jsx 설명은 생략.

    render() {
      return (
          <div>
            <header className="title">
              Hanjun Blog
            </header>
          </div>
      );
    }
결과물로 나온 Element들이 가상 DOM에 mount되고 실제 DOM에 업데이트된다.

배열과 Fragments : 여러 개의 Elements를 반환하고 싶다면 배열을 사용하면 좋다. 여러 개의 Elements가 담긴 배열을 차례로 인식한다. 그 대신 Fragments나 <></>구문 등을 통해 감싸주어야 한다.

    render() {
      const targetLists = lists.map((el, index) => {
        return (
          <button key={index} type="button">
            {el}
          </button>
        );
      });

      return (
        <Fragments>
          {targetLists}
        </Fragments>
      );
    }
Boolean or Null : return 구문에 Boolean 값이나 Null 값이 포함된다면 아무 것도 rendering 하지 않는다. 따라서 다음과 같이 사용할 수 있다.

    render () {
      return (
        {isRight && <Logout />}
      );
    }
//typeof isRight === 'Boolean';
String or Number : return 구문에 String 값이나 Number 값이 있다면 DOM상의 Text 노드로 렌더링 된다.

render 를 작성할 때 주의해야 할 사항은 다음과 같다.

Render() 메소드는 순수(Pure Function)해야 한다. 여기서 순수해야한다는 의미는 같은 input에 대해서 같은 output이 나와야 한다는 것을 의미한다. 시점이나 상황에 따라 다른 결과물을 리턴하는 것을 지양해야 한다.
render() 메소드 안에서 setState 작업을 하면 안된다. 무한 루프에 빠질 것이다. setState가 실행되면 업데이트가 되어 다시 render가 되는데 또 다시 setState가 실행되고 다시 render가 실행되고…
componentDidMount
componentDidMount()는 컴포넌트의 결과물이 DOM에 mount된 직후 실행되는 메소드이다. 보통 다음과 같은 경우에 사용된다.

DOM노드를 확인하고 초기화해야 하는 작업이 있는 경우

ex.) 모달이나 툴팁과 같이 mount 되고 나서 사이즈나 위치를 확인한 다음 작업을 진행해야 하는 경우.

외부의 데이터를 불러오거나 네트워크 요청을 보내야하는 경우

componentDidMount에서 바로 setState를 실행할 경우, 렌더링이 완료되고 다시 업데이트하여 또 다시 렌더링을 하게 된다. 하지만 이 경우에는 사용자는 2번 실행되는 렌더링 과정을 볼 수 없다. 브라우저에 화면을 갱신하기 전 실행되기 때문이다.

하지만 이렇게 2번 렌더링 되는 과정은 성능상으로 문제를 일으킬 수 있으므로 주의가 필요하다. 필요한 경우를 제외하면 최초에 실행되는 생성자(constructor)에서 세팅하도록 하자.

## Update(업데이트)
Component들은 state 나 props 가 변경이 되면 update가 진행이 되며 다시 rendering 된다. Input이 달라지니 output이 달라져야 하기 때문이다. 그리고 상위 component가 update되면 그에 속한 하위 component들도 다시 mount가 된다.

component가 update될 때 아래의 순서대로 메소드가 실행이 된다.

- New Props / setState()

- render()

- componentDidUpdate()

New Props
상위 Component로부터 갱신된 props 를 받는 경우가 있다. 이 때, 갱신된 props 를 받은 Component 들은 다시 렌더링되며, update cycle을 진행하게 된다.

### setState

- Component들은 공통적으로 setState() api를 제공한다. 이 메소드의 경우 현재 자신이 가진 state를 변경할 수 있도록 해준다. setState() api로 state가 update cycle을 진행하게 된다.

### componentDidUpdate

- componentDidUpdate 는 update 가 이루어지고 render가 완료된 직후 실행되는 메소드이다. 최초 마운트 될 때는 실행되지 않는다.

componentDidUpdate(prevProps, prevState, snapshot)

componentDidUpdate 는 3개의 인자를 받는다.

prevProps : 업데이트가 되기 전 prop을 인자로 받을 수 있다. 이전 props와 변경이 되었는지 안 되었는지를 확인 한 후 추가적인 액션을 설정하는 것에 유용하다.

    componentDidUpdate(prevProps) {
      if (this.props.Id !== prevProps.Id) {
        fetchData(this.props.Id);
      }
    }
prevState : prevProps와 마찬가지로 업데이트가 되기 전 state 정보를 인자로 받을 수 있다. 이전 state와 비교하여 실행여부를 결정할 때 주로 사용된다.

    componentDidUpdate(prevProps, prevState) {
      if (this.state.Id !== prevState.Id) {
        fetchData(this.props.Id);
      }
    }
snapshot : getSnapshotBeforeUpdate() 메소드를 구현했다면 세번째 인자로 snapshot을 받을 수 있다.
componentDidUpdate 를 이용할 때, setState를 주의해야 한다. 조건문 등으로 제어해두지 않으면 무한 루프에 빠질 수 있기 때문이다.

setState > componentDidupdate > SetSate ...

## Unmount(제거)
해당하는 Component가 DOM상에서 제거가 될 때 실행되는 lifeCycle이다.

### componentWillUnmount

- 최종적으로 제거가 되기 전 실행이 된다. component 내에서 이루어지는 네트워크 요청, 타이머 이벤트 등 지속적으로 이루어지는 이벤트들을 해제하는데 유용하게 사용된다.

예를 들면 setInterval 메소드를 실행했는데, 이를 close해주지 않으면 전역에서 계속 타이머가 돌아갈 것이다. 따라서 제거되기 전에 이러한 것들을 해제시켜주어야 한다.

