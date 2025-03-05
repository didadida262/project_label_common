import { cn } from "@/utils/cn";
import { useEffect } from "react";

interface IProps {
    datalist: any;
    currentPic: any;
    setcurrentPic: (data) => void
}
export default function PictureList (props:IProps) {
    const {datalist, currentPic, setcurrentPic} =  props
    useEffect(() => {
        console.log('currentPic>>>', currentPic)
    }, [currentPic])
    return (
        <div className={cn(
            "w-full h-full",
        )}>
            {datalist &&datalist.length ? (
                <div className={cn(
                    "flex justify-center flex-col items-center gap-y-[8px]",
                )}>
                    {datalist.map((item, index) => (
                        <div
                          key={item.id}
                          className={cn(
                            "picItem border-solid ",
                            "w-full h-[200px]",
                            "flex justify-center flex-col items-center",
                            "hover:cursor-pointer",
                            currentPic && currentPic.id === item.id? 'rounded-md border-[3px] border-[red]':'  border-[1px] border-borderFirstColor'

                        )}
                        onClick={() => {
                            console.log('shezhi---item', item)
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