import React, { useEffect } from 'react';
import { loadModules } from 'esri-loader';

function Map() {
  useEffect(() => {
    // Función para cargar el mapa y la capa de carreteras
    const loadMap = async () => {
      try {
        // Cargar los módulos Map, MapView, FeatureLayer, Home y Legend de ArcGIS
        const [Map, MapView, FeatureLayer, Home, Legend] = await loadModules([
          'esri/Map',
          'esri/views/MapView',
          'esri/layers/FeatureLayer',
          'esri/widgets/Home',
          'esri/widgets/Legend'
        ]);

        // Crear una instancia del Map
        const map = new Map({
          basemap: 'streets-vector'
        });

        // Crear una instancia del MapView
        const view = new MapView({
          container: 'map',
          map: map,
          zoom: 5,
          center: [-74, 4] // Coordenadas aproximadas del centro de Colombia
        });

        // Cargar la capa de carreteras de Colombia
        const layerUrl =
          'https://hermes2.invias.gov.co/server/rest/services/MapaCarreteras/RedVial/FeatureServer/1';
        const layer = new FeatureLayer({
          url: layerUrl,
          renderer: {
            type: 'unique-value',
            field: 'categoria',
            uniqueValueInfos: [
              {
                value: 'Primer Orden',
                symbol: {
                  type: 'simple-line',
                  color: 'red',
                  width: 4
                }
              },
              {
                value: 'Segundo Orden',
                symbol: {
                  type: 'simple-line',
                  color: 'blue',
                  width: 2
                }
              },
              {
                value: 'Tercer Orden',
                symbol: {
                  type: 'simple-line',
                  color: 'green',
                  width: 1
                }
              }
            ],
            defaultSymbol: {
              type: 'simple-line',
              color: 'grey',
              width: 2
            }
          }
        });

        // Añadir la capa al mapa
        map.add(layer);

        // Crear el botón "Home" para volver al extent inicial
        const homeBtn = new Home({ view });
        view.ui.add(homeBtn, 'top-left');

        // Crear el widget de leyenda
        const legend = new Legend({ view });
        view.ui.add(legend, 'bottom-right');
      } catch (error) {
        console.error('Error al cargar el mapa:', error);
      }
    };

    loadMap();
  }, []);

  return <div id="map" style={{ width: '100%', height: '600px' }}></div>;
}

export default Map;
