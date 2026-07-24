export function formatTime (seconds){

    let minutes = Math.floor(seconds / 60)
    let secondsLeft = Math.floor(seconds % 60);
    
    if (secondsLeft < 10){
        secondsLeft = "0" + secondsLeft;
    };

    if (minutes < 10){
        minutes = "0" + minutes;
    }

    return `${minutes}:${secondsLeft}`
    
}