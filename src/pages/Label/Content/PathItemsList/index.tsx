import React, { useEffect } from "react";
import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import "./index.scss";

interface IProps {
  categories: any
}

const PathItemsList = (props: IProps) => {
  const { categories } = props;
  const handleClickPathItem = item => {
    item.path.selected = !item.path.selected;
  };
  useEffect(() => {}, [categories]);
  return (
    <div className="PathItemsList">
      {categories.map((item, index) => {
        return (
          <div className="w-full mb-[5px] rounded-[0px]" key={index}>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className="w-full"
              onClick={() => handleClickPathItem(item)}
            >
              {/* {"标注数据：" + item.name.slice(0, 10) + "..."} */}
              {"标注数据：" + (index + 1)}
            </ButtonCommon>
          </div>
        );
      })}
    </div>
  );
};
export default PathItemsList;
