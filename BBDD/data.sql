CREATE TABLE recetas (
    id INT not null auto_increment primary key,
    nombre VARCHAR(45) not null,
    ingredientes VARCHAR(1000) not null,
    instrucciones TEXT not null
    );
INSERT INTO recetas (nombre, ingredientes, instrucciones)
VALUES ('Tarta de queso', '350 g. de vuestro queso crema preferido,
2 huevos XL,
175 g. nata 35% M.G.,
100 g. azúcar,
40 g. harina de trigo', 'Elegimos un molde desmoldable redondo de 20 cm. Lo engrasamos con la mantequilla y ponemos papel para vegetal o para hornear. Reservamos.
Precalentamos el horno a 200º C, calor arriba y abajo.
En un bol añadimos todos los ingredientes, el queso crema, la nata, los dos huevos, el azúcar y, por último la harina, y batimos.
Vertemos la mezcla en el molde forrado y lo introducimos en el horno previamente calentado a 200º C. dejandolo hornear durante 45minutos'),
('Pan casero', '500gr Harina de trigo, 325ml agua templada, 15 gr levadura fresca, 10 gr sal, 10 gr azúcar, 40ml de aceite de oliva', 'Mezclamos todo los ingredientes y amasamos con las manos hasta formar una bola de masa homogenea. Dejamos reposar durante 30 minutos en un bol enharinado y tapado con  film. Pasado este tiempo habrá doblado su masa, colocamos en la bandeja del horno y horneamos a 200ºC durante 40 minutos')