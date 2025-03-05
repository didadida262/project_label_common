import React from "react";
import Pointer from "../Pointer";
import Rect from "./Rect";
import cn from "classnames";


interface IProps {
    activeTool: string;
    handleClickTool: (data:any) => void;
    submitPath:  (path: any) => void
    
}
export default function ToolsContainer(props:IProps) {
    const { activeTool, handleClickTool, submitPath } = props
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
        </div>
    )
}