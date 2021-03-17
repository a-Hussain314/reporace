export default function daysAgoCalculater(dateString){
    let days = Math.floor((new Date().getTime() - new Date(dateString).getTime()  )/(1000*60*60*24))
    return {
        days : days,
        postix : days>1 ? "days" : "day"
    }
}
