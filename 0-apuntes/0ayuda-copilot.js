/*
Ventajas y desventajas de SSR (Server-Side Rendering) y CSR (Client-Side Rendering):

SSR (Server-Side Rendering)
---------------------------
Ventajas:
- Mejor SEO: El contenido se entrega ya renderizado, facilitando la indexación por buscadores.
- Menor tiempo hasta el primer renderizado (First Contentful Paint) en conexiones lentas.
- Mejor para compartir en redes sociales (previews correctos).

Desventajas:
- Mayor carga en el servidor.
- Interactividad puede tardar más (necesita hidratar el JS en el cliente).
- Navegación entre páginas puede ser más lenta si no se usa caching adecuado.

CSR (Client-Side Rendering)
---------------------------
Ventajas:
- Menor carga en el servidor.
- Mejor experiencia de usuario en aplicaciones SPA (Single Page Application).
- Navegación rápida entre páginas después de la carga inicial.

Desventajas:
- Peor SEO (a menos que se use pre-rendering o soluciones híbridas).
- Tiempo hasta el primer renderizado puede ser mayor (el usuario espera a que se descargue y ejecute el JS).
- Puede no funcionar bien en dispositivos antiguos o con JS deshabilitado.
*/