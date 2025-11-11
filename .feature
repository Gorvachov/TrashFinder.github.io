@HU-052 @EP-07 @LandingPage

Feature: Primer Acercamiento a la App
Como un usuario nuevo,
Quiero ver un titular tipo eslogan en la página principal
Para saber si me interesa la app.

Scenario: Mostrar titular y descripción principal al cargar la página
Given que el usuario nuevo accede por primera vez a la landing page
When Start to type your When step here la página carga completamente
Then Start to type your Then step here el usuario debe visualizar un titular destacado en la parte central de la pantalla
And el titular debe describir claramente el propósito o beneficio principal del producto
And ambos textos deben ser legibles y visibles sin necesidad de hacer scroll

Scenario: Validar la claridad y comprensión del mensaje de bienvenida
Given que el usuario observa el titular
When el contenido se evalúa en términos de comprensión
Then el mensaje debe ser entendible en menos de 5 segundos
And no debe contener tecnicismos o ambigüedades que dificulten su interpretación

Scenario Outline: Comprobación visual del titular en distintos dispositivos
Given que el usuario accede desde un dispositivo <dispositivo>
When se visualiza la landing page
Then el titular debe mantenerse visible y correctamente alineado
And no debe superponerse ni salirse de la vista principal.

Examples: Dispositivos de prueba
| dispositivo |
| móvil       |
| tablet      |
| computadora |

@HU-052 @EP-07 @LandingPage

Feature: Primer acercamiento a la app
Como usuario nuevo, quiero ver un titular tipo eslogan en la página principal para saber si me interesa la app.

Scenario: Mostrar el titular y descripción principal al ingresar a la página
Given que el usuario nuevo accede por primera vez a la landing page
When la página carga completamente
Then el usuario debe visualizar un titular destacado en la parte central de la pantalla
And el titular debe describir claramente el propósito o beneficio principal del producto
And ambos textos deben ser legibles y visibles sin necesidad de hacer scroll

Scenario: Validar la claridad del mensaje
Given que el usuario observa el titular
When el contenido se evalúa en términos de comprensión
Then el mensaje debe ser entendible en menos de 5 segundos
And no debe contener tecnicismos o ambigüedades que dificulten su interpretación

Scenario Outline: Comprobación visual en distintos dispositivos
Given que el usuario accede desde un dispositivo <dispositivo>
When se visualiza la landing page
Then el titular debe mantenerse visibles y correctamente alineado
And no debe superponerse ni salirse de la vista principal.

Examples:
| dispositivo |
| móvil       |
| tablet      |
| computadora |

@HO-54 @EP-08 @LandingPage @Descarga

Feature: Acceso a la descarga de la aplicación móvil
Como visitante interesado, quiero encontrar fácilmente el enlace de descarga de la app Trash Finder desde la landing page para instalarla en mi dispositivo móvil.

Scenario: Visualización del botón de descarga
Given que el usuario se encuentra en la parte inferior del landing page
When llega a la sección final
Then debe visualizar un botón o enlace que diga Descarga la app.

Scenario Outline: Enlace funcional a la tienda de aplicaciones
Given que el usuario selecciona Descarga la app
When hace clic en el enlace para la tienda <tienda>
Then debe redirigirlo correctamente a la tienda correspondiente
And la redirección debe ser exitosa.

Examples: Tiendas de Aplicaciones
| tienda        |
| Google Play  |
| App Store    |

Scenario: Confirmación de acción visual
Given que el usuario interactúa con el botón
When pasa el cursor o lo toca
Then debe mostrar un cambio visual (color o sombra) que confirme la acción.

@HO-55 @EP-08 @LandingPage @Registro

Feature: Acceso al registro de usuario desde la landing page
Como visitante interesado quiero acceder al formulario de registro directamente desde la landing page para crear mi cuenta de manera rápida y sin pasos innecesarios

Scenario: Redirección desde el botón de acción
Given que el usuario se encuentra en la página principal
When selecciona el botón "Regístrate" o "Empieza Ya"
Then debe redirigirse al formulario de registro correspondiente

Scenario: Validación de campos obligatorios
Given que el usuario completa sus datos en el formulario de registro
When deja algún campo obligatorio vacío
Then debe mostrarse un mensaje indicando cuál campo falta completar
And no debe permitir el envío del formulario hasta que se complete

Scenario: Confirmación del registro exitoso
Given que el usuario completa correctamente todos los campos del formulario
When presiona el botón "Registrarme"
Then debe visualizar un mensaje de bienvenida o ser redirigido a la pantalla principal del usuario

@HO-56 @EP-08 @LandingPage @Visualización

Feature: Visualización del apartado “¿Cómo funciona Trash Finder?”
Como usuario nuevo quiero entender cómo funciona Trash Finder desde la landing page para conocer sus principales características antes de descargar la app

Scenario: Presentación de pasos ilustrados
Given que el usuario navega a la sección “¿Cómo funciona Trash Finder?”
When la página carga completamente
Then deben mostrarse los <pasos> principales con íconos:
| Paso                 |
| Localizar contenedores |
| Botar residuos         |
| Ganar puntos           |

Scenario: Visualización de información adicional
Given que el usuario selecciona “Ver más”
When interactúa con un <paso>
Then debe visualizar información más detallada sobre esa función

Scenario: Claridad de contenido en todos los dispositivos
Given que el usuario usa distintos dispositivos
When accede a la sección explicativa
Then los textos deben ser legibles
And las imágenes deben conservar su tamaño y proporción

@HO-57 @EP-08 @LandingPage @Visualización

Feature: Visualización de beneficios principales
Como visitante del sitio quiero ver los beneficios clave del uso de Trash Finder para comprender rápidamente su valor ambiental y social

Scenario: Mostrar los beneficios destacados
Given que el usuario navega por la sección “Beneficios”
When la página se desplaza hacia esa área
Then se deben visualizar los tres <beneficios> principales:
| Beneficio             |
| Mayor limpieza         |
| Ahorro de tiempo       |
| Recompensas ecológicas |

Scenario: Interacción con los botones de información
Given que el usuario observa los <beneficios>
When hace clic en “Ver más”
Then debe abrirse una ventana emergente o expandirse la información detallada del beneficio seleccionado

Scenario: Diseño visual coherente
Given que el usuario está en distintos dispositivos
When accede a la sección “<Beneficios>”
Then los íconos y textos deben mantenerse alineados y legibles
And no deben superponerse ni perder formato

@HO-58 @EP-08 @LandingPage @Navegación

Feature: Navegación en la landing page
Como usuario nuevo quiero navegar fácilmente entre las secciones del landing page para conocer los servicios, beneficios y funcionamiento de Trash Finder sin perderme en la interfaz

Scenario: Navegación principal visible
Given que el usuario accede al landing page
When la página termina de cargar
Then el menú superior debe mostrar claramente las <secciones>:
| Sección         |
| Inicio          |
| Servicios       |
| Contacto        |
| Quiénes somos   |
| Inicia Sesión   |
And los enlaces deben ser funcionales y llevar a cada sección correspondiente

Scenario: Destacado del botón de acción principal
Given que el usuario visualiza la página inicial
When se muestra el encabezado principal
Then el botón “Empieza Ya” debe ser visible y contrastar con el fondo
And al hacer clic debe llevar al registro o login según corresponda

Scenario: Compatibilidad de navegación
Given que el usuario utiliza un dispositivo móvil o de escritorio
When interactúa con el menú
Then este debe adaptarse correctamente al tamaño de pantalla
And debe mantener la misma funcionalidad en ambos dispositivos

@HO-59 @EP-08 @LandingPage @InicioSesion

Feature: Inicio de sesión en la aplicación
Como usuario registrado quiero iniciar sesión en Trash Finder usando mi correo y contraseña para acceder a mis datos, rutas y alertas personalizadas

Scenario: Ingreso con credenciales correctas
Given que el usuario se encuentra en la pantalla de inicio de sesión
When introduce su correo y contraseña válidos
Then debe acceder correctamente a la pantalla principal
And ver el mensaje de bienvenida con su nombre y los puntos acumulados

Scenario: Error por credenciales incorrectas
Given que el usuario intenta iniciar sesión
When introduce un correo o contraseña inválidos
Then debe mostrarse el mensaje “Usuario y/o contraseña incorrectos”
And mantenerse en la misma pantalla para intentar nuevamente

Scenario: Recordar sesión activa
Given que el usuario marca la opción “Recuérdame”
When cierra y vuelve a abrir la app
Then debe ingresar automáticamente sin volver a escribir sus datos
