export default function(){
    const inDevelopment = window.location.hostname ==='localhost';
    return inDevelopment ? 'http://localhost:8081/':'/';
}