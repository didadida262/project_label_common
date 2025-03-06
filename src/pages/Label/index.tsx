import { message } from "antd";
import cn from "classnames";
import paper from "paper";
import React, {  useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import Brush from "@/pages/Label/Tool/Brush";
import BrushV2 from "@/pages/Label/Tool/BrushV2";
import pattern from "@/styles/pattern";
import Pencil from "@/pages/Label/Tool/Pencil";
import PictureList from './Content/PictureList/PictureList'

import CenterComponent from "./Center";
import DrawComponent from "./Content/Draw";
import PathItemsList from "./Content/Categories/PathItemsList";
import Spray from "./Spray";
// import ToolsComponent from './Tools'
import ToolsContainer from './Tool/ToolsContainer'

import CategoriesContainer from '@/pages/Label/Content/Categories'
import {MockPicData,  MockCategories } from '@/mock/label'


const LabelComponent = () => {
  const [activeTool, setactiveTool] = useState("pencil");
  const [currentPic, setcurrentPic] = useState() as any;
  const [categories, setcategories] = useState([]) as any;
  const [currentPath, setcurrentPath] = useState(null) as any;
  const [currentCategory, setcurrentCategory] = useState() as any


  const handleClickTool = tool => {
    setactiveTool(tool);
    message.success(`激活${tool}`);
  };
  const handleNewPath = () => {
    if (!currentPath) return;
    const name = uuidv4();
    const id = currentCategory.data.length
    const newPath = {
      key: id,
      name: name,
      path: currentPath
    };
    console.log("新增数据>>>", newPath);
    // setcurrentCategory(
    //   {
    //     ...currentCategory,
    //     data: currentCategory.data.push(newPath)
    //   }
    // )
    // setcategories(prevItems => [...prevItems, newPath]);
  }

  useEffect(
    () => {
      handleNewPath()

    },
    [currentPath]
  );
  const submitPath = data => {
    setcurrentPath(data);
  };
  const [datalist,setdatalist] = useState() as any
  const getData = () =>{
      setdatalist(MockPicData)
      setcurrentPic(MockPicData[0])
      setcategories(MockCategories)
      setcurrentCategory(MockCategories[0])
  }
  useEffect(() => {
      getData()

  }, [])
  useEffect(() => {
    // setcategories([])
  }, [currentPic])
  return (
    <div
      className={cn(
        `w-full h-full label px-[10px] py-[10px]`,
        "flex flex-col justify-between items-center"
      )}
    >
      <div className="top w-full h-[50px]">
        <ToolsContainer submitPath={submitPath} activeTool={activeTool} handleClickTool={handleClickTool} />
      </div>
      <div className={cn(
        "bot w-full h-[calc(100%_-_55px)]",
        "flex justify-between items-center"
      )}>
        <div className={
          cn(
            "piclist",
            "w-[300px] h-full px-common py-common",
            "border-solid border-[1px] border-borderFirstColor",
            "overflow-y-scroll"
          )
        }>
          <PictureList datalist={datalist} setcurrentPic={setcurrentPic} currentPic={currentPic}/>
        </div>
        <div className={cn("h-full max-w-[calc(100%_-_490px)] rounded-[4px] border-[1px] border-solid border-borderSecondColor")}>
          <DrawComponent activeTool={activeTool} currentPic={currentPic}/>
        </div>
        <div className={cn(
          "border-solid border-[1px] border-borderFirstColor",
          "w-[180px] h-full rounded-[4px]"
        )}>
          <CategoriesContainer categories={categories} currentCategory={currentCategory} setcurrentCategory={setcurrentCategory}/>
        </div>
      </div>

    </div>
  );
};

export default LabelComponent;
