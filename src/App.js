import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './Home'
import About from './About'
import NewPost from './NewPost'
import PostPage from './PostPage'
//import Post from "./Post";
import Missing from "./Missing";
//import PostLayout from "./PostLayout";
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import { useEffect, useState } from 'react';
import { format } from "date-fns"
//import api from './api/posts'  // Using axios
//import api from "../src/api/posts"  // Using axios

function App() {

  const [posts, setPosts] = useState([
    
     {
       id: 1,
       title: "My First Post",
       datetime: "July 01, 2021 11:17:36 AM",
       body: "I attend a blackchain event"
     },
     {
       id: 2,
       title: "My Second Post",
       datetime: "July 01, 2022 11:17:36 AM",
       body: "I attend a python event"
     },
     {
       id: 3,
       title: "My Third Post",
       datetime: "July 23, 2024 11:17:36 AM",
       body: "I attend a react event"
     }

  ])  // empty array

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // new post code
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const navigate = useNavigate();


  //  useEffect(() => {
  //    const fetchPosts = async () => {
  //      try{
  //          const response = await api.get('/posts');
  //          if(!response.ok) throw Error("Data not Received");
  //          setPosts(response.data)
  //      } catch (err ) {
  //        if(err.response) {
  //         //console.log("error");
  //          // Not in the 200 response
  //          //console.log(err.response.data);
  //          //console.log(err.response.status);  // 404
  //          console.log(err.response.headers);
  //        } else {
  //          console.log(`Error: ${err.message}`);
  //        }
  //      }
  //    }

  //    fetchPosts();
  //  },[])

  // Search Posts
   useEffect(() => {
     const filteredResults = posts.filter((post) =>
     ((post.body).toLowerCase()).includes(search.toLowerCase())
     || ((post.title).toLowerCase()).includes(search.toLowerCase())
     );
     setSearchResults(filteredResults.reverse())
   },[posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    
    const allPosts = [...posts, newPost] ;
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  } 

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList)
    navigate('/')
  }

  return (
    <div className="App">
      <Header title="Selva Learning Social Media" />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element= {
            <Home posts={searchResults} /> } />
        
        <Route path="post"> 
          <Route index element = {
          <NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          /> } />
          <Route path=":id" element={
            <PostPage posts = {posts} handleDelete={handleDelete} />
          } />
        </Route>
        {/* <PostPage /> */}

        <Route path="about" element= { <About /> } />
        <Route path="*" element= { <Missing /> } />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
