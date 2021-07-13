import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import Login from "./Components/Login";
import "./App.css";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Shop from "./Components/Shop";
import Igtv from "./Components/Igtv";
import Profile from "./Components/Profile";
import ProfileUpdate from "./Components/ProfileUpdate";
import Message from "./Components/Message";
import Upload from "./Components/Upload";
import Likes from "./Components/Likes";
import Posts from "./Components/Posts";
import ProductUpload from "./Components/ProductUpload";
import ProductPage from "./Components/ProductPage";
import EditProduct from "./Components/EditProduct";
import Followers from "./Components/Followers";
import Following from './Components/Following'
import Story from "./Components/Story";
import MobileMessage from "./Components/MobileMessage";
import Comments from "./Components/Comments";

function App() {


  const history = useHistory();
  const [Localdata, setLocaldata] = useState("");
  const [product, setproduct] = useState("");
  const [state, setstate] = useState(false);
  const [setcurrentprofile, setsetcurrentprofile] = useState("");
  const [currentmessage, setcurrentmessage] = useState('');
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      setLocaldata(JSON.parse(localStorage.getItem("user-info")));
    }

    if (localStorage.getItem("product-info")) {
      setstate(true);
      setproduct(JSON.parse(localStorage.getItem("product-info")).id);
    }

    if (localStorage.getItem("clicked_img_owner")) {
      setsetcurrentprofile(
        JSON.parse(localStorage.getItem("clicked_img_owner"))
      );
    }

    if (localStorage.getItem("current_message")) {
      setcurrentmessage(
        JSON.parse(localStorage.getItem("current_message"))
      );
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route exact path="/shop">
          <Header />
          <Shop />
        </Route>

        <Route path="/igtv">
          <Header />
          <Igtv />
        </Route>

        <Route path="/profileupdate">
          <Header />
          <ProfileUpdate />
        </Route>

        {/* for member profiles make separate profile.jsx file */}

        <Route exact path="/profile/:profile">
          <div
            className="responsive_header_for_profile_only"
            style={{ width: "100%" }}
          >
            <Header />
          </div>
          <div
            className="appjs_profile"
            style={{ overflowX: "hidden", width: "100%" }}
          >
            <Profile />
          </div>
        </Route>

        <Route path="/message">
          <div className="responsive_header_for_profile_only">
            <Header />
          </div>
          <Message />
        </Route>

        <Route path="/upload">
          <Header />
          <Upload />
        </Route>

        <Route path="/likes">
          <Header />
          <Likes />
        </Route>

        <Route exact path="/posts/:username">
          <Header />
          <Posts />
        </Route>

        <Route exact path="/upload-product">
          <Header />
          <ProductUpload />
        </Route>

        {state ? (
          <Route exact path={`/shop/product/${product}`}>
            <Header />
            <ProductPage />
          </Route>
        ) : null}


        <Route exact path="/edit-product">
          <div className="responsive_header_for_profile_only">
            <Header />
            <EditProduct />
          </div>
        </Route>

<Route exact path='/followers/:username' >
<Header />
<Followers />
</Route>

<Route  path='/following/:name' >
<Header />
<Following />
</Route>

{currentmessage?<Route path='/mobilemessage'>
<Header />
<MobileMessage />
</Route>:null}


<Route path={'/story/:id'}>
<div className="responsive_header_for_profile_only">
            <Header />
          </div>
          <Story />
</Route>

{localStorage.getItem('user-comments')?
<Route path='/comments/:id' >
<Header/>
<Comments />
</Route>
:null}

        <Route exact path="/">
          <Header />
          <Home />
        </Route>



      </BrowserRouter>
    </>
  );
}

export default App;
