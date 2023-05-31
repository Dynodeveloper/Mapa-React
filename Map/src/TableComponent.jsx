import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

// eslint-disable-next-line react/prop-types
function Table({ view }) {
  const tableContainerRef = useRef(null);

  useEffect(() => {
    let featureTable;

    const loadTable = async () => {
      try {
        const [FeatureLayer, FeatureTable] = await loadModules([
          'esri/layers/FeatureLayer',
          'esri/widgets/FeatureTable'
        ]);

        const layerUrl =
          'https://hermes2.invias.gov.co/server/rest/services/MapaCarreteras/RedVial/FeatureServer/1';
        const layer = new FeatureLayer({
          url: layerUrl
        });

        featureTable = new FeatureTable({
          view: view,
          container: tableContainerRef.current,
          layer: layer,
          visibleElements: {
            selectionColumn: true
          },
          autoSelectFeatures: true
        });
      } catch (error) {
        console.error('Error al cargar la tabla:', error);
      }
    };

    loadTable();

    return () => {
      if (featureTable) {
        featureTable.destroy();
      }
    };
  }, [view]);

  return <div ref={tableContainerRef} style={{ width: '100%', height: '200px' }}></div>;
}

export default Table;
