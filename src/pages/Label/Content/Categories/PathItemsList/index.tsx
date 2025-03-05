import React, { useEffect } from "react";
import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { cn } from "@/utils/cn";

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
    <div className={cn(
      "flex flex-col gap-y-[8px]"
    )}>
      {categories.map((item, index) => {
        return (
          <div className="w-full rounded-[0px]" key={index}>
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
