import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/authRedirectHook";
import Form from "../components/form/Form";
import Appheader from "../components/header/header";
import Mainfooter from "./main/footer";

const PostItems = () => {

  return (
    <>
    <Appheader/>
    <Form/>
    <Mainfooter/>
    </>
  );
};

export default PostItems;
