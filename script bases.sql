CREATE TABLE usuarios (
    usuario_id INT PRIMARY KEY auto_increment,
    nombre_usuario VARCHAR(40),
    contrasena VARCHAR(20),
    usuario VARCHAR(20)
);

CREATE TABLE egresos (
    egreso_id INT PRIMARY KEY  auto_increment,
    fecha VARCHAR(8),
    monto VARCHAR(7),
    descripcion VARCHAR(20),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE ingresos (
    ingresos_id INT PRIMARY KEY,
    fecha DATE,
    monto VARCHAR(255),
    descripcion VARCHAR(300),
    name VARCHAR(80)
);

CREATE TABLE proveedores (
    proveedor_id INT PRIMARY KEY  auto_increment, 
    nombre VARCHAR(16),
    contacto VARCHAR(20),
    telefono INT,
    direccion VARCHAR(20)
);

CREATE TABLE productos (
    producto_id INT PRIMARY KEY auto_increment,
    proveedor_id INT,
    nombre_producto VARCHAR(30),
    descripcion VARCHAR(100),
    precio_unitario INT,
    fecha_vencimiento VARCHAR(10),
    codigo_barras varchar(30),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(proveedor_id)
);

CREATE TABLE inventario (
    inventario_id INT PRIMARY KEY  auto_increment,
    producto_id INT,
    cantidad_disponible INT,
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);

CREATE TABLE clientes (
    cliente_id INT PRIMARY KEY  auto_increment,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    email VARCHAR(50),
    telefono INT,
    direccion VARCHAR(100),
    estado VARCHAR(50),
    estado_civil VARCHAR(50)
);

CREATE TABLE factura (
    factura_id INT PRIMARY KEY  auto_increment,
    fecha DATE,
    fecha_realizada DATE,
    cliente_id INT,
    vendedor_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id),
    FOREIGN KEY (vendedor_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE ventas (
    nit INT PRIMARY KEY,
    factura_id INT,
    inventario_id INT,
    cantidad INT,
    subtotal VARCHAR(15),
    total_venta INT,
    FOREIGN KEY (factura_id) REFERENCES factura(factura_id),
    FOREIGN KEY (inventario_id) REFERENCES inventario(inventario_id)
);

CREATE TABLE reporte_diario (
    reporte_id INT PRIMARY KEY auto_increment,
    cliente_id INT,
    fecha_venta DATE,
    valor_total DECIMAL(10, 2),
    valor_con_iva DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

INSERT INTO usuarios (nombre_usuario, contrasena, usuario)VALUES ('admin', '1234', 'admin');

INSERT INTO proveedores (nombre, contacto, telefono, direccion) VALUES
('Farmatech', 'Carlos Lopez', 30012, 'Calle 10 #20-30'),
('SaludPlus', 'Ana Gomez', 3019, 'Carrera 15 #25-10'),
('BioGen', 'Miguel Torres', 30265, 'Avenida 5 #10-15'),
('MediCorp', 'Laura Perez', 31012, 'Calle 20 #5-10'),
('Vitalife', 'Jose Ramirez', 3117, 'Carrera 30 #40-50'),
('NutriHealth', 'Sandra Medina', 31287, 'Avenida 3 #15-25'),
('MedSupply', 'Jorge Martinez', 313234, 'Calle 25 #8-12'),
('SaludTotal', 'Rosa Herrera', 3143456, 'Carrera 40 #50-60'),
('BioMedica', 'Pedro Suarez', 315456, 'Avenida 1 #9-20'),
('PharmaPlus', 'Maria Villa', 31656, 'Calle 8 #22-33');


INSERT INTO productos (proveedor_id, nombre_producto, descripcion, precio_unitario, fecha_vencimiento) VALUES
(1,'Aspirina', 'Analgésico y antipirético', 100, '2025-12-31'),
(2,'Paracetamol', 'Analgésico suave', 80, '2025-10-10'),
(3,'Ibuprofeno', 'Analgésico y antiinflamatorio', 120, '2024-08-15'),
(4,'Amoxicilina', 'Antibiótico para infecciones', 200, '2025-03-20'),
(5,'Omeprazol', 'Para problemas estomacales', 150, '2026-05-18'),
(6,'Vitamina C', 'Suplemento vitamínico', 50, '2025-09-30'),
(7,'Clorfenamina', 'Antihistamínico', 90, '2024-07-15'),
(8,'Azitromicina', 'Antibiótico de amplio espectro', 250, '2025-11-11'),
(9,'Metformina', 'Medicamento para diabetes', 110, '2025-08-05'),
(10,'Enalapril', 'Antihipertensivo', 180, '2025-02-22');



INSERT INTO inventario (inventario_id, producto_id, cantidad_disponible) VALUES
(1, 1, 200),
(2, 2, 150),
(3, 3, 120),
(4, 4, 100),
(5, 5, 250),
(6, 6, 300),
(7, 7, 220),
(8, 8, 80),
(9, 9, 200),
(10, 10, 90);

INSERT INTO inventario (producto_id, cantidad_disponible) VALUES
(11, 200);






