import { cn } from "@/utils/cn";

interface IProps {
    datalist: any;
    setcurrentPic: (data) => void
}
export default function PictureList (props:IProps) {
    const {datalist, setcurrentPic} =  props



    return (
        <div className={cn(
            "w-full h-full",
        )}>
            {datalist &&datalist.length ? (
                <div className={cn(
                    "flex justify-center flex-col items-center gap-y-[8px]",
                )}>
                    {datalist.map((item, index) => (
                        <div className={cn(
                            "picItem",
                            "w-full h-[200px]",
                            "flex justify-center flex-col items-center",
                            "border-solid border-[1px] border-borderFirstColor",
                            "hover:cursor-pointer"

                        )}
                        onClick={() => {
                            setcurrentPic(item)
                        }}
                        >
                            <img src={item.src} alt="" />
                        </div>
                    ))}
                </div>
            ) : (
                'kong'
            )}
            
        </div>
    )
}