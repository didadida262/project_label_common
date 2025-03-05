import React, { useRef, useState, useContext } from "react";
import { useClickAway } from "react-use";

import Pointer from "../Pointer";
import Rect from "./Rect";
import cn from "classnames";
import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import paper from "paper";
import { HexColorPicker } from "react-colorful";
import { ColorContext } from "@/pages/Label/ColorProvider";

interface IProps {
    activeTool: string;
    handleClickTool: (data:any) => void;
    submitPath:  (path: any) => void
    
}
export default function ToolsContainer(props:IProps) {
    const { activeTool, handleClickTool, submitPath } = props
		const [colorSelector, setcolorSelector] = useState(false);
		const triggerRef = useRef<HTMLDivElement>(null);
		const dropdownRef = useRef<HTMLDivElement>(null);
		const { color, setColor } = useContext(ColorContext);

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
    return (
        <div className={cn(
					`flex items-center justify-start gap-x-[10px]`,
					'w-full h-full'
				)}>
					<Pointer activeTool={activeTool} onClick={handleClickTool} />
					<Rect
						activeTool={activeTool}
						onClick={handleClickTool}
						submitPath={submitPath}
					/>
					<ButtonCommon
						className="w-[100px] text-[12px]"
						type={EButtonType.SIMPLE}
						onClick={handleExportPicture}
						>
						<span className="ml-[8px]">Export Picture</span>
					</ButtonCommon>
					<div className={cn("flex flex-col gap-y-2")}>
          {/* <div
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
                  className="absolute right-[0px] top-[200px] z-50"
                >
                  <HexColorPicker color={color} onChange={setColor} />
                </div>}
            </div>
          </div> */}

        </div>
        </div>
    )
}