import React, { useState, useRef, useEffect } from 'react';
import './tooltip.css';

/**
 * 툴팁 컴포넌트
 * @param {JSX.Element} props.content - 툴팁에 들어갈 내용
 * @param {JSX.Element} props.children - 툴팁을 보여줄 컴포넌트
 * @returns {JSX.Element} - Tooltip 컴포넌트
 * @auther MayoneJY <mayone6063@kakao.com>
 */
export default function Tooltip({ content, children }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipContainerRef = useRef(null);
    const tooltipRef = useRef(null);
    const [tooltipPosition, setTooltipPosition] = useState('right');
    const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

    const handleMouseEnter = () => {
        if (tooltipContainerRef.current) {
            const { width, height } = tooltipContainerRef.current.getBoundingClientRect();
            setParentSize({ width, height });
        }
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    useEffect(() => {
        if (tooltipContainerRef.current && tooltipRef.current && showTooltip) {
            const containerRect = tooltipContainerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            if (window.innerWidth - containerRect.right < tooltipRect.width) {
                setTooltipPosition('left');
            } else {
                setTooltipPosition('right');
            }
            console.log(window.innerWidth, containerRect.right, tooltipRect.width )
        }
    }, [showTooltip]);

    return (
        <div 
        className="tooltip-container" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        ref={tooltipContainerRef}
        >
        {children}
        {showTooltip && (
            <div className={`tooltip-box ${tooltipPosition}`}
                style={{ width: parentSize.width+parentSize.width+28, height: parentSize.height+12 }}
                ref={tooltipRef}
            >
                {content}
            </div>
        )}
        </div>
    );
}