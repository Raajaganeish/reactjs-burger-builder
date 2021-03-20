import React, { Component, Suspense, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, withRouter } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Authentication/Logout/Logout";
import { authCheckStatus } from "./store/actions";
import { connect } from "react-redux";
import AsyncComponent from "./components/HOC/AsyncComponent/AsyncComponent";
import { Spinner } from "./components/UI/Spinner/Spinner";

// const AsyncOrdersComponent = AsyncComponent(() =>
//   import("./containers/Orders/Orders")
// );
// const AsyncAuthentication = AsyncComponent(() =>
//   import("./containers/Authentication/Authentication")
// );
// const AsyncInitiateComponent = AsyncComponent(() =>
//   import("./components/Order/InitiateComponent/InitiateCheckout")
// ); //React.Lazy(() => import())

// class App extends Component {
//   componentDidMount() {
//     this.props.onTryAutoSignIn();
//   }
//   render() {
//     return (
//       <div>
//         <Layout>
//           <Route path="/" exact component={BurgerBuilder} />
//           <Route path="/initiateCheckout" component={AsyncInitiateComponent} />
//           <Route path="/auth/user" component={AsyncAuthentication} />
//           <Route path="/myOrders" component={AsyncOrdersComponent} />
//           <Route path="/auth/logout" component={Logout} />
//         </Layout>
//       </div>
//     );
//   }
// }

const AsyncOrdersComponent = React.lazy(() =>
  import("./containers/Orders/Orders")
);
const AsyncAuthentication = React.lazy(() =>
  import("./containers/Authentication/Authentication")
);
const AsyncInitiateComponent = React.lazy(() =>
  import("./components/Order/InitiateComponent/InitiateCheckout")
);
const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignIn();
  }, []);
  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Route path="/" exact component={BurgerBuilder} />
          <Route
            path="/initiateCheckout"
            render={() => <AsyncInitiateComponent />}
          />
          <Route
            path="/auth/user"
            render={(props) => <AsyncAuthentication {...props} />}
          />
          <Route
            path="/myOrders"
            render={(props) => <AsyncOrdersComponent {...props} />}
          />
          <Route
            path="/auth/logout"
            render={(props) => <Logout {...props} />}
          />
        </Suspense>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckStatus()),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(App));
