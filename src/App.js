import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { PhotoProvider } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { getUser } from "./app/features/auth/dbUserSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(getUser(currentUser.email)).then(results => {
          if(results.payload.success){
            localStorage.setItem("tech_token", results.payload.jwtToken);
            localStorage.setItem("activeUser", true);
          }else{
            localStorage.removeItem("activeUser");
          }
        });
      } else {
       localStorage.removeItem("activeUser");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="App vendorListHeading scroll-smooth">
        <PhotoProvider>
          <RouterProvider router={router} />
        </PhotoProvider>
    </div>
  )
}

export default App;


// Build Your Own Product Landing Page With Authentication-Abdullah Al Fahim