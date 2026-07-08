# Character AI Chat

Aplicación web tipo SPA para chatear con personajes ficticios usando inteligencia artificial.

El usuario puede elegir un personaje, ingresar a una pantalla de chat y mantener una conversación interactiva. Cada personaje responde con una personalidad distinta gracias al uso de prompts personalizados, configuración de temperatura y conexión con Gemini AI mediante Vercel Functions.

Proyecto desarrollado como parte del Proyecto Integrador del Módulo 3 de SoyHenry.

## URL del proyecto

```txt
https://character-ai-chat-three.vercel.app
```

## Descripción

Character AI Chat es una aplicación frontend construida con HTML, CSS y JavaScript modular.

El proyecto implementa navegación tipo SPA, manejo de rutas del lado del cliente, vistas separadas, diseño responsive y conexión segura con una API de inteligencia artificial.

La comunicación con Gemini no se realiza directamente desde el frontend, sino a través de una función serverless en Vercel. De esta forma, la API key se mantiene protegida mediante variables de entorno.

## Personajes disponibles

La aplicación permite conversar con los siguientes personajes:

| Personaje      | Descripción general |
| -------------- | ------------------- |
| Deadpool       | Personaje sarcástico, caótico y con humor irónico |
| Rick Sanchez   | Científico brillante, cínico, arrogante y sarcástico |
| Naruto Uzumaki | Personaje energético, optimista y motivador |

Cada personaje cuenta con:

- Nombre.
- Imagen.
- Descripción.
- Prompt personalizado.
- Temperatura propia para ajustar el estilo de respuesta.
- Historial de conversación durante la sesión.

## Funcionalidades principales

- Selección de personaje desde la pantalla principal.
- Chat interactivo con respuestas generadas por Gemini AI.
- Prompts personalizados para cada personaje.
- Historial de mensajes separado por personaje durante la sesión.
- Indicador visual de “Escribiendo...” mientras se espera la respuesta.
- Manejo de errores de la API.
- Modo mock para desarrollo sin consumir requests reales de Gemini.
- Navegación SPA sin recargar la página.
- Diseño responsive para mobile, tablet y desktop.
- Deploy en Vercel.
- Tests unitarios con Vitest.

## Rutas disponibles

| Ruta     | Descripción |
| -------- | ----------- |
| `/home`  | Pantalla principal con selección de personajes |
| `/chat`  | Pantalla de conversación con el personaje elegido |
| `/about` | Información sobre el proyecto |
| `*`      | Vista para rutas no encontradas |

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- JavaScript Modules
- History API
- Gemini API
- Vercel Functions
- Vercel
- Vitest
- Git
- GitHub

## Integración con Gemini AI

La aplicación utiliza Gemini AI para generar las respuestas de los personajes.

El frontend envía el mensaje del usuario y los datos del personaje a una función serverless ubicada en:

```txt
api/functions.js
```

Desde esa función se llama a Gemini utilizando la API key guardada como variable de entorno.

Esto evita exponer la clave privada en el navegador.

La función recibe información como:

```json
{
  "characterId": "rick",
  "systemPrompt": "Prompt personalizado del personaje",
  "temperature": 0.82,
  "messages": [
    {
      "role": "user",
      "content": "Hola Rick"
    }
  ]
}
```

Y devuelve una respuesta como:

```json
{
  "reply": "Respuesta generada por el personaje"
}
```

## Variables de entorno

Para ejecutar el proyecto localmente se debe crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
USE_MOCK_AI=true
GEMINI_API_KEY=tu_api_key_de_gemini
```

### USE_MOCK_AI

Permite alternar entre respuestas simuladas y respuestas reales de Gemini.

Durante el desarrollo:

```env
USE_MOCK_AI=true
```

En producción:

```env
USE_MOCK_AI=false
```

### GEMINI_API_KEY

Clave privada utilizada para conectarse con Gemini AI.

Esta variable no debe subirse al repositorio.

El archivo `.env` está excluido mediante `.gitignore` y `.vercelignore`.

## Ejecutar el proyecto localmente

### Requisitos previos

- Node.js
- npm
- Vercel CLI
- API key de Gemini

### Clonar el repositorio

```bash
git clone https://github.com/Leonelbruno/character-ai-chat.git
cd character-ai-chat
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
USE_MOCK_AI=true
GEMINI_API_KEY=tu_api_key_de_gemini
```

### Iniciar el proyecto

```bash
vercel dev
```

La aplicación estará disponible en:

```txt
http://localhost:3000
```

## Scripts disponibles

Ejecutar tests en modo observación:

```bash
npm test
```

Ejecutar tests una sola vez:

```bash
npm test -- --run
```

## Tests

El proyecto incluye tests unitarios con Vitest.

Se testean funciones relacionadas con:

- Normalización de texto.
- Validación de mensajes.
- Creación de objetos de mensaje.
- Selección controlada de elementos.
- Cliente de API con `fetch` mockeado.

Resultado esperado:

```txt
Test Files  2 passed
Tests       9 passed
```

## Manejo de errores

La aplicación contempla errores en la comunicación con Gemini AI.

Algunos casos contemplados:

| Caso | Descripción |
| ---- | ----------- |
| Método no permitido | La función serverless solo acepta peticiones POST |
| Falta de personaje | Se valida que exista un personaje seleccionado |
| Historial inválido | Se valida que los mensajes enviados tengan formato correcto |
| Falta de API key | Se informa si la variable de entorno no está configurada |
| Límite de Gemini | Se informa cuando se alcanza el límite gratuito de requests |

Ejemplo de error:

```json
{
  "error": "Se alcanzó el límite gratuito de Gemini. Probá de nuevo más tarde."
}
```

## Seguridad

La API key de Gemini no se encuentra en el frontend.

La aplicación protege la clave mediante:

- Uso de variables de entorno.
- Archivo `.env` excluido del repositorio.
- Archivo `.vercelignore` para evitar subir archivos sensibles al deploy.
- Uso de Vercel Functions para realizar la llamada a Gemini desde el backend serverless.

Archivos importantes:

```txt
.env
.env.example
.gitignore
.vercelignore
api/functions.js
```

## Deployment

El proyecto está desplegado en Vercel.

URL pública:

```txt
https://character-ai-chat-three.vercel.app
```

El repositorio de GitHub está conectado con Vercel, por lo que los cambios enviados a la rama principal pueden generar un nuevo deploy automáticamente.

Variables de entorno usadas en producción:

```env
USE_MOCK_AI=false
GEMINI_API_KEY=variable_configurada_en_vercel
```

## Estructura general del proyecto

```txt
character-ai-chat/
├── api/
│   └── functions.js
├── src/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── router.js
│   ├── state.js
│   ├── chat.js
│   ├── chatState.js
│   ├── chatRenderer.js
│   ├── apiClient.js
│   ├── utils.js
│   ├── images/
│   ├── data/
│   │   └── characters/
│   │       ├── deadpool.js
│   │       ├── rick.js
│   │       ├── naruto.js
│   │       └── index.js
│   └── views/
│       ├── home.js
│       ├── chatView.js
│       ├── about.js
│       └── notFound.js
├── tests/
│   ├── app.test.js
│   └── utils.test.js
├── .env.example
├── .gitignore
├── .vercelignore
├── package.json
├── package-lock.json
├── README.md
└── vercel.json
```

## Registro de uso de AI

Durante el desarrollo del proyecto se utilizó asistencia de AI como apoyo para:

- Organizar el flujo de trabajo.
- Definir la estructura inicial del proyecto.
- Resolver errores de configuración.
- Entender el uso de Vercel Functions.
- Configurar variables de entorno.
- Integrar Gemini AI de forma segura.
- Crear prompts personalizados para los personajes.
- Implementar modo mock para evitar consumo innecesario de requests.
- Guiar la creación de tests con Vitest.
- Mockear `fetch` en los tests.
- Revisar errores de deploy.
- Mejorar el README final.

El uso de AI fue utilizado como acompañamiento para comprender errores, tomar decisiones de estructura y mejorar la documentación del proyecto.

### Ejemplo 1: Protección de la API key

**Prompt utilizado:**

```txt
Como puedo hacer para que pueda usar Gemini sin que quede expuesta la API key en el front?
```

**Respuesta resumida de la AI:**

```txt
La API key no debe estar en el navegador. Conviene crear una Vercel Function que reciba el mensaje desde el frontend y llame a Gemini desde el backend usando una variable de entorno.
```

**Aplicación en el proyecto:**

```txt
Se creó el archivo api/functions.js para centralizar la llamada a Gemini desde una función serverless, manteniendo la API key protegida en variables de entorno.
```

---

### Ejemplo 2: Modo mock para desarrollo

**Prompt utilizado:**

```txt
Che como puedo seguir probando el chat sin gastar las requests?
```

**Respuesta resumida de la AI:**

```txt
Se puede agregar una variable USE_MOCK_AI. Si está en true, la función serverless devuelve una respuesta simulada y no llama a Gemini.
```

**Aplicación en el proyecto:**

```txt
Se agregó USE_MOCK_AI para alternar entre respuestas simuladas en desarrollo y respuestas reales de Gemini en producción.
```

---

### Ejemplo 3: Tests con fetch mockeado

**Prompt utilizado:**

```txt
Como hago para testear la funcion que llama a functions.js sin tener que hacer una request real?
```

**Respuesta resumida de la AI:**

```txt
Se puede mockear globalThis.fetch con Vitest para simular una respuesta exitosa o una respuesta con error.
```

**Aplicación en el proyecto:**

```txt
Se creó un test para apiClient.js usando fetch mockeado. Esto permite verificar que se envíen correctamente los datos a la serverless function sin consumir Gemini.
```

---

### Ejemplo 4: Problema de rutas en Vercel y archivos estáticos

**Prompt utilizado:**

```txt
Mira, te voy a volver a decir algo. Si desde VS Code entro al HTML y pongo run (http://127.0.0.1:5500/home) todo anda de diez. Pero si entro al link http://localhost:3000/home, se ve el HTML principal pero no funciona el home, about ni chat. Estoy viendo que cuando cambio a home o chat o about cambia el link al final /home /chat /about pero la página no se renderiza.
```

**Respuesta resumida de la AI:**

```txt
El problema estaba relacionado con el uso de rutas relativas en el HTML. En Vercel, al entrar a rutas como /home, /chat o /about, el navegador seguía ubicado en esa ruta y podía buscar mal los archivos JavaScript y CSS.

La solución fue usar rutas absolutas para cargar los archivos principales:

<link rel="stylesheet" href="/src/style.css" />
<script type="module" src="/src/app.js"></script>
```

**Explicación:**

```txt
Con esta ayuda pude entender que el problema no estaba en el router, sino en cómo el navegador estaba buscando los archivos cuando la aplicación se ejecutaba desde Vercel. Al cambiar las rutas del CSS y JavaScript a rutas absolutas, la SPA pudo cargar correctamente y las vistas /home, /chat y /about empezaron a renderizarse bien.
```

## Autor

Proyecto desarrollado por Leonel Bruno Vera como parte del Módulo 3 de SoyHenry.
