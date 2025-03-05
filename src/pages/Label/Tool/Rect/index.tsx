import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsTextareaResize } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import pattern from "@/styles/pattern";
import {drawXY,removeLayer} from '@/utils/paperjsWeapon'

import "./index.scss";
import { current } from "@reduxjs/toolkit";

const RectComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);

  const name = "rect";
  let path = {} as any;
  let tool = null as any;
  let first = new paper.Point(0, 0);
  const removeSelection = () => {
    if (path) {
      path.remove();
    }
  };
  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
    } else {
      tool = new paper.Tool();
      tool.name = name;
      tool.onMouseDown = e => {
        path = new paper.Path({
          strokeColor: color,
          strokeWidth: 10
        });
        first = e.point;
      };
      tool.onMouseDrag = e => {
        const currentProject = paper.project

        removeSelection();
        removeLayer(currentProject, 'layerXY' )

        const width = e.point.x - first.x;
        const height = e.point.y - first.y;
        path = new paper.Path.Rectangle(
          new paper.Point(first.x, first.y),
          new paper.Size(width, height)
        );
        path.strokeColor = color;
      };
      tool.onMouseMove = e => {
        const currentProject = paper.project
        removeLayer(currentProject, 'layerXY' )
        drawXY(paper.project, e.point)
      };
      tool.onMouseUp = e => {
        path.add(e.point);
        submitPath(path.clone());
        path.remove();
      };
      tool.activate();
    }
  };

  useEffect(
    () => {
      initTool();
      return () => {};
    },
    [color]
  );
  useEffect(
    () => {
      initTool();
      console.log(paper);
    },
    [activeTool]
  );
  return (
    <div className="rect">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsTextareaResize />
      </ButtonCommon>
    </div>
  );
};

export default RectComponent;
