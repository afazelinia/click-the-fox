export default function getDateTime() {
    return new Date().toLocaleDateString('en-us', {
        year:"numeric",
        month:"short",
        day:"numeric",
    })
}
