// health check URL
function Ping() {
    return {}
}

// This gets called on every request
export async function getServerSideProps(context) {
    context.res.end('pong');
    return { props: {} }
}

export default Ping;