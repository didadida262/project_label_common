import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";



interface IProps {
  categories: any;
  currentCategory: any;
  setcurrentCategory: (cate) => void
}

export default function CategoriesContainer(props: IProps) {
  const { categories, currentCategory, setcurrentCategory } = props
  const handleClickCateItem = (cate) => {
    setcurrentCategory(cate)
  }
  useEffect(() => {
    console.log('categories》》》', categories)
  }, [categories])

  return (
    <div className={cn(
      "flex flex-col gap-y-[8px]",
      "w-full h-full",
      "overflow-y-auto"
    )}>
      {categories && categories.length && categories.map((category, index) => {
        return (
          <div
            key={category.id}
            className={cn(
              "w-full",
            )}>
            <CateItem category={category} currentCategory={currentCategory} setcurrentCategory={setcurrentCategory} />
          </div>
        );
      })}
    </div>
  )
}

interface IPropsCateItem {
  category: any;
  currentCategory: any;
  setcurrentCategory: (cate) => void
}

const CateItem = (props: IPropsCateItem) => {
  const { category, currentCategory, setcurrentCategory } = props
  const [showFlag, setshowFlag] = useState(false)
  const handleClickCateItem = (cate) => {
    setshowFlag(!showFlag)
    setcurrentCategory(cate)
  }
  return (
    <div className={cn(
      "w-full",
    )}
      key={category.id}>
      <ButtonCommon
        type={EButtonType.SIMPLE}
        className={cn(
          "w-full rounded-none",
          currentCategory.id === category.id ? 'bg-orange-500' : ''
        )}
        onClick={() => handleClickCateItem(category)}
      >
        {category.name}
      </ButtonCommon>
      {showFlag && category.data && category.data.length ? (
        <div className={cn(
          "duration-200"
        )}>
          {category.data.map((label, indexx) => (
            <div
              key={label.id}
              //  className={{backgroundColor:label.color}}>
              style={{ backgroundColor: label.color }}
            >
              {'标注数据: ' + indexx}
            </div>
          ))}
        </div>
      ) : ('')}
    </div>
  )

}