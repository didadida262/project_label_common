import { message } from "antd";
import cn from "classnames";
import paper from "paper";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "react-use";
import { v4 as uuidv4 } from "uuid";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import Brush from "@/pages/Label/Tool/Brush";
import BrushV2 from "@/pages/Label/Tool/BrushV2";
import pattern from "@/styles/pattern";
import Pencil from "@/pages/Label/Tool/Pencil";
import PictureList from './Content/PictureList'

import CenterComponent from "./Center";
import DrawComponent from "./Draw";
import PathItem from "./PathItem";
import Spray from "./Spray";
// import ToolsComponent from './Tools'
import ToolsContainer from './Tool/ToolsContainer'
import testimg1 from '@/assets/images/common/test.jpg'
import testimg2 from '@/assets/images/common/test2.jpg'
import testimg3 from '@/assets/images/common/test3.jpg'
import testimg4 from '@/assets/images/common/test4.jpg'

const LabelComponent = () => {
  const [activeTool, setactiveTool] = useState("pencil");
  const [currentPic, setcurrentPic] = useState();
  const [categories, setcategories] = useState([]) as any;
  const [currentPath, setcurrentPath] = useState(null) as any;
  const { color, setColor } = useContext(ColorContext);
  const [colorSelector, setcolorSelector] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickTool = tool => {
    setactiveTool(tool);
    message.success(`激活${tool}`);
  };
  const handleExportPicture = () => {
    paper.view.element.toBlob(function(blob: any) {
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "myImage.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  useClickAway(dropdownRef, (e: MouseEvent) => {
    console.log("useClickAway>>>>");
    // 如果點擊事件的目標不在 triggerRef 中，則關閉 dropdown
    if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
      setcolorSelector(false);
    }
  });
  useEffect(
    () => {
      if (!currentPath) return;
      const ID = uuidv4();
      const newPath = {
        key: ID,
        name: ID,
        path: currentPath
      };
      console.log("新增数据>>>", newPath);
      setcategories(prevItems => [...prevItems, newPath]);
    },
    [currentPath]
  );
  const submitPath = data => {
    setcurrentPath(data);
  };
  const [datalist,setdatalist] = useState() as any
  const getData = () =>{

      const mockdata = [
          {
              id: 0,
              src: testimg1
          },
          {
              id: 1,
              src: testimg2 
          },
          {
              id: 2,
              src: testimg3
          },
          {
              id: 3,
              src: testimg4
          },
          {
              id: 4,
              src: testimg4
          }

      ]
      setdatalist(mockdata)
  }
  useEffect(() => {
      getData()

  }, [])
  return (
    <div
      className={cn(
        `w-full h-full label px-[10px] py-[10px]`,
        "flex flex-col justify-between items-center"
      )}
    >
      {/* <div
        className={`${pattern.flexBetCol} tools-container h-full w-[100px] `}
      >

        <div className={cn("flex flex-col gap-y-2")}>
          <div
            className={cn(
              "w-[100px] text-[12px] h-[36px]",
              "flex justify-center items-center",
              "border-solid border-[1px] border-[#383B45] rounded-[4px]",
              "hover:cursor-pointer select-none"
            )}
            ref={triggerRef}
          >
            <div className="ml-[8px] relative">
              <span onClick={() => setcolorSelector(!colorSelector)}>
                Color Selector
              </span>
              {colorSelector &&
                <div
                  ref={dropdownRef}
                  className="absolute right-[-200px] top-[-200px] z-50"
                >
                  <HexColorPicker color={color} onChange={setColor} />
                </div>}
            </div>
          </div>
          <ButtonCommon
            className="w-[100px] text-[12px]"
            type={EButtonType.SIMPLE}
            onClick={handleExportPicture}
          >
            <span className="ml-[8px]">Export Picture</span>
          </ButtonCommon>
        </div>
      </div> */}
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
          <PictureList datalist={datalist} setcurrentPic={setcurrentPic}/>
        </div>
        <div className={cn("h-full max-w-[calc(100%_-_490px)] rounded-[4px] border-[1px] border-solid border-borderSecondColor")}>
          <DrawComponent activeTool={activeTool} currentPic={currentPic}/>
        </div>
        <div className={cn(
          "border-solid border-[1px] border-borderFirstColor",
          "w-[180px] h-full rounded-[4px] overflow-y-scroll"
        )}>
          <PathItem data={categories} />
        </div>
      </div>

    </div>
  );
};

export default LabelComponent;
