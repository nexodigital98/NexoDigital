# Guía de Personalización — Nexo Digital

Esta guía es para que puedas editar la página sin problemas, aunque no sepas nada de código. Todo está explicado al punto, sin rodeos.

---

## 1. ¿Para qué sirve cada archivo?

Tienes 3 archivos que hacen que la página funcione y una carpeta de imágenes:

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Aquí están todos los textos, precios y secciones. Lo que quieres cambiar, lo cambias aquí. |
| `style.css` | Aquí está el diseño: colores, tamaños, bordes, efectos. |
| `script.js` | Aquí están las animaciones y la lógica. No lo toques a menos que quieras cambiar cómo se comporta algo. |
| `img/` | Aquí van todas las imágenes organizadas por carpetas. |

---

## 2. Cambiar los colores de toda la página

Abre `style.css`. Justo al inicio hay un bloque que se llama `:root { }`.
Ahí está todo el sistema de colores. Cambia los valores que están después del `#` y el cambio se aplica en todo el sitio automáticamente.

```css
:root {
    --color-primario: #1A5EA8;   /* Azul principal */
    --color-acento:   #00E5FF;   /* Cyan neón (botones, luces, bordes) */
    --color-fondo-oscuro: #070B13; /* El fondo oscuro general */
}
```

Para saber qué código hexadecimal usar, busca **"color picker html"** en Google y copia el código del color que te gusta.

**Ejemplo:** Para hacer la página verde en lugar de azul, cambia `#1A5EA8` por `#1B5E20` y `#00E5FF` por `#69F0AE`.

---

## 3. Cambiar el logo

El logo está en `img/logos/NEXO DIGITAL.png`.

**Opción A (la más simple):** Borra ese archivo, pon tu logo en esa misma carpeta y ponle el mismo nombre exacto: `NEXO DIGITAL.png`. Listo, la página lo carga sola.

**Opción B (si tu logo tiene otro nombre):**
1. Abre `index.html`.
2. Presiona `Ctrl + F` y busca: `img/logos/NEXO%20DIGITAL.png`
3. Reemplaza esa ruta por el nombre de tu archivo (aparece en 3 lugares).

---

## 4. Cambiar el número de WhatsApp

1. Abre `index.html`.
2. Presiona `Ctrl + F` y busca: `593986777289`
3. Reemplaza ese número por el del nuevo cliente en **todo el archivo**.

> El formato es: código de país + número sin cero inicial, sin espacios y sin el signo `+`.
> **Ejemplo Ecuador:** número `098 765 4321` → escribe `593987654321`

También busca el número con formato visible `+593 98 677 7289` (está en el footer) y cámbialo por el número real que va a leer el cliente.

---

## 5. Cambiar textos, títulos y precios

1. Abre `index.html`.
2. Presiona `Ctrl + F` y busca el texto que quieres cambiar (por ejemplo: `$20`, `WhatsApp Business`, `Combo Top 3`).
3. Edítalo directamente. El precio o texto está entre etiquetas como `<span>` o `<h3>`, solo cambia lo que está adentro.

**Ejemplo:**
```html
<!-- Antes -->
<span class="sl-price-main">$20</span>

<!-- Después -->
<span class="sl-price-main">$25</span>
```

---

## 6. Cambiar la tarjeta dorada de bienvenida

La tarjeta que aparece al inicio tiene varias partes que puedes editar:

**Nombre del negocio en la tarjeta:**
Busca `<h2>NEXO DIGITAL</h2>` en `index.html` y cambia el texto por el nombre del cliente en mayúsculas.

**Frase debajo del nombre:**
Busca `Conectamos tu negocio con el mundo` y cámbiala.

**El circulo "EC" en la parte inferior:**
Busca `<div class="bottom-rating-circle">EC</div>` y cambia las siglas por las que quieras (ej: `VIP`, `★`, `PRO`).

**Color dorado de la tarjeta:**
En `style.css`, busca `#C8A835`. Ese es el dorado principal. Para cambiar la tarjeta a plateado, por ejemplo, cámbialo por `#9E9E9E`. El mismo cambio aplica también para `#F0D070` y `#B8860B` que son los otros tonos del dorado.

---

## 7. Cambiar las imágenes de los servicios

Las imágenes de los 5 personajes de redes sociales están en `img/redes/`.
Si quieres reemplazar alguna, solo pon tu nueva imagen en esa carpeta con el mismo nombre:

- `WHATSAPP.png`
- `INSTAGRAM.png`
- `TIKTOK.png`
- `LINKEDLN.png`
- `FACEBOOK.png`

La imagen del equipo en el hero está en `img/hero/EQUIPO.png`. Cámbiala por la que quieras con ese mismo nombre.

---

## 8. Subir la página a internet gratis

Cuando tengas todo listo, súbela a **Netlify** en menos de 1 minuto:

1. Entra a [netlify.com](https://www.netlify.com) y crea una cuenta gratis.
2. Ve a **Sites** y busca la zona que dice *"Drag and drop your site folder here"*.
3. Arrastra la carpeta `NEXODIGITAL` completa ahí.
4. En segundos te da un enlace público. Ese enlace se lo mandas al cliente.
5. Puedes renombrar el enlace desde la configuración del sitio (ej: `mi-cliente.netlify.app`).

---

## 9. Usar esto como plantilla para otros clientes (Marca Blanca)

Para adaptar este sitio a otro negocio:

1. **Copia** toda la carpeta `NEXODIGITAL` y ponle el nombre del nuevo cliente.
2. Cambia el **logo** en `img/logos/`.
3. Cambia los **colores** en `style.css` (sección `:root`).
4. Cambia el **número de WhatsApp** con Ctrl+F en `index.html`.
5. Cambia los **textos y precios** donde corresponda.
6. Reemplaza las **imágenes** en `img/` si quieres algo distinto.
7. Sube a Netlify y listo — tienes un sitio nuevo para otro cliente.

Cada personalización completa te toma entre 30 y 60 minutos una vez que ya conoces el código.
