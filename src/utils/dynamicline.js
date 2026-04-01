export function getDynamicLineWidth(oldPoint, newPoint) {
    const dx = newPoint.x - oldPoint.x;
    const dy = newPoint.y - oldPoint.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Dynamic line width based on speed
    const maxLineWidth =11; // slowest movement → thickest line
    const minLineWidth = 5;  // fastest movement → thinnest line

    const lineWidth = Math.max(
        minLineWidth,
        Math.min(maxLineWidth, maxLineWidth - distance / 2)
    );

    return lineWidth;
}