# Examen-Backend - TravelBudgeteer API

Este es el archivo README.md del proyecto de backend que tiene por objetivo implementar y desarrollar una API con Node.js y base de datos SQL, como parte de un proceso de evaluación. El proyecto se centra en el desarrollo de una aplicación que gestiona una base de datos relacional de usuarios con un método de ahorro, presupuestos y destinos. A continuación, se describen los principales temas que se abordaron durante el desarrollo:

## Temas cubiertos

### Server
En este proyecto, se implementó un servidor utilizando el lenguaje de programación y el entorno adecuado. Se configuró el servidor para escuchar las solicitudes HTTP y se manejaron las rutas de manera eficiente.

### Routing
Se definieron y gestionaron las rutas de la aplicación. Cada ruta se asoció a un controlador específico, lo que permitió dirigir las solicitudes entrantes a las funciones correspondientes.

### Controllers
Los controladores se utilizaron para manejar las solicitudes HTTP específicas. Se implementaron funciones para cada operación requerida, como registrar usuarios, agregar presupuestos y planes de ahorro o proporcionar destinos.

### Validations
Se aplicaron validaciones a los datos de entrada recibidos en las solicitudes para garantizar que cumplieran con los requisitos y restricciones necesarios antes de ser procesados.

### Middlewares
Los middlewares se utilizaron para interceptar y procesar las solicitudes antes de que lleguen a los controladores. Se implementaron middlewares para manejar la autorización, la autenticación y otras tareas así como el middleware que nos permite manejar errores. 

### Endpoints
Los endpoints fueron definidos y configurados para permitir el acceso a las diferentes funcionalidades de la aplicación, como el registro e inicio de sesión de usuarios, la gestión de presupuestos y la recuperacíon de destinos.

### ORM (Object-Relational Mapping)
Se utilizó Prisma ORM, para interactuar con la base de datos relacional. Prisma nos facilitó el mapeo entre los objetos de la aplicación y las tablas de la base de datos, lo que simplificó las operaciones de lectura y escritura de datos. Además que nos proporcionó herramientas para mejorar los controladores de nuestras rutas.

### SQL
Las operaciones SQL se realizaron a través de Prisma para crear, leer, actualizar y eliminar registros en la base de datos.

### Hash y Token
Se aplicaron técnicas de hashing y generación de tokens para almacenar contraseñas de forma segura y para gestionar la autenticación y autorización de los usuarios.

### Roles y Authorization
Se implementó un sistema de roles y autorización para controlar los permisos de los usuarios en la aplicación. Se definieron diferentes roles y se asignaron permisos específicos a cada uno.
