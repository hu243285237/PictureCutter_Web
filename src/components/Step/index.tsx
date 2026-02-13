import { type ReactNode } from 'react';

/**
 * 参数
 */
interface Props {
    /**
     * 步骤编号
     */
    step: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 子内容
     */
    children: ReactNode;
}

/**
 * 步骤容器组件 
 */
export default function Step({ step, title, children }: Props) {
    return (
        <div className="mb-16 flex flex-col items-center justify-center w-full">
            <h2 className="mb-6 text-xl font-bold text-[rgb(226,220,137)]">
                STEP {step}: {title}
            </h2>
            {children}
        </div>
    );
}
