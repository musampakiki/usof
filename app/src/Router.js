import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// components
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import Channel from "./pages/Channel";

import WatchArticle from "./pages/WatchArticle";
import SearchResults from "./pages/SearchResults";
import Library from "./pages/Library";
import History from "./pages/History";

import YourArticles from "./pages/YourArticles";
import LikedArticles from "./pages/LikedArticles";
import EditProfile from "./components/EditProfile";

const AppRouter = () => (
  <Router>
    <ScrollToTop />
    <Navbar />
    <Sidebar />
    <BottomBar />
    <Container>
      <Switch>

        <Route path="/watch/:articleId" component={WatchArticle} />
        <Route path="/channel/:userId" component={Channel} />
        <Route path="/results/:searchterm" component={SearchResults} />
        <Route path="/feed/trending" component={Trending} />
        <Route path="/feed/subscriptions" component={Subscriptions} />
        <Route path="/feed/library" component={Library} />
        <Route path="/feed/history" component={History} />

        <Route path="/feed/my_articles" component={YourArticles} />

        <Route path="/feed/liked_articles" component={LikedArticles} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
