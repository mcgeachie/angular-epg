import com.sun.net.httpserver.*
import groovy.json.*

class ResourceHandler implements HttpHandler {

    def proxy = 'http://tv.sky.com/'
    def local = 'http://localhost:3501/'
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

            def proxiedUrl = new URL( local + path ).bytes
            exchange.sendResponseHeaders(200, proxiedUrl.size());
            exchange.getResponseBody().write(proxiedUrl);
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