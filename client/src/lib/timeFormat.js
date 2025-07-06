const timeFormat = (minutes) => {
    const hours = Math.floor(minutes/60);
    const mini = minutes%60;
    return `${hours}h ${mini}m`;
}
export default timeFormat;