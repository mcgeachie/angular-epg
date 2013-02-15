import com.sun.net.httpserver.*
import groovy.json.*

class ResourceHandler implements HttpHandler {

    def proxy = 'http://tv.sky.com/'
    def server

    public void handle(HttpExchange exchange){

    try{

        def requestMethod = exchange.requestMethod
        def path = exchange.requestURI as String

        if( path.startsWith( '/api/' ) ){

            def proxiedUrl = new URL( path.replace( '/api/', proxy ) ).text
            exchange.sendResponseHeaders(200, proxiedUrl.size());
            exchange.getResponseBody().write(proxiedUrl.bytes);
            exchange.close();

        } else {

            path = ( path == '/' ) ? 'index.html' : path
            def f = new File('app' + File.separator + path)
            exchange.sendResponseHeaders(200, f.size());
            exchange.getResponseBody().write(f.bytes);
            exchange.close();

        }

    } catch( Exception e ){
        e.printStackTrace()
    }
    }
}


HttpServer server = HttpServer.create(new InetSocketAddress(8888),0);
server.createContext("/", new ResourceHandler(server:server));
server.setExecutor(null); // creates a default executor
println 'starting server'
server.start();