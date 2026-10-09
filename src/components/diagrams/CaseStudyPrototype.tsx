import { useState } from 'react';

interface Props {
  slug: string;
  accentColor: string;
}

export const CaseStudyPrototype = ({ slug, accentColor }: Props) => {
  // Metro state
  const [origin, setOrigin] = useState('Centralen');
  const [destination, setDestination] = useState('Universitetet');
  const [wheelchairOnly, setWheelchairOnly] = useState(false);

  // Atlas state
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedEra, setSelectedEra] = useState('All');

  // Current Grid state
  const [gridMode, setGridMode] = useState<'BASE' | 'SOLAR_PEAK' | 'WIND_GALE'>('SOLAR_PEAK');

  // Forge state
  const [armLength, setArmLength] = useState('1200mm');
  const [material, setMaterial] = useState('Titanium T6');
  const [actuator, setActuator] = useState('Hydraulic 45kN');

  // Field Guide state
  const [contourStep, setContourStep] = useState(25);
  const [shelterStatus, setShelterStatus] = useState(true);

  // Nexus state
  const [floor, setFloor] = useState('L2');

  if (slug === 'metro-01') {
    const stations = ['Centralen', 'Gamla Stan', 'Slussen', 'Odenplan', 'Universitetet', 'Mörby'];
    const travelMinutes = origin === destination ? 0 : 14;

    return (
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--paper)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor }}>PROTOTYPE 01 / LIVE JOURNEY DISPATCH</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}>TRANSIT CARTOGRAPHY SIMULATOR</div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
            STATUS: <span style={{ color: 'var(--network-green)' }}>SYNCED 50Hz</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ORIGIN STATION</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', fontFamily: 'var(--font-sans)', fontSize: '13px', backgroundColor: 'var(--canvas)' }}
            >
              {stations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>DESTINATION STATION</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--line)', fontFamily: 'var(--font-sans)', fontSize: '13px', backgroundColor: 'var(--canvas)' }}
            >
              {stations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '18px' }}>
            <input
              type="checkbox"
              id="wheelchair"
              checked={wheelchairOnly}
              onChange={(e) => setWheelchairOnly(e.target.checked)}
              style={{ accentColor }}
            />
            <label htmlFor="wheelchair" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
              ELEVATOR-GUARANTEED ONLY
            </label>
          </div>
        </div>

        {/* Live SVG transit route */}
        <div style={{ backgroundColor: 'var(--canvas)', border: '1px solid var(--line)', padding: '24px 16px', position: 'relative' }}>
          <svg viewBox="0 0 700 80" style={{ width: '100%', height: '80px', display: 'block' }}>
            <line x1="40" y1="40" x2="660" y2="40" stroke="var(--mist)" strokeWidth="6" strokeLinecap="round" />
            <line x1="40" y1="40" x2="660" y2="40" stroke={accentColor} strokeWidth="6" strokeLinecap="round" strokeDasharray="620" strokeDashoffset={origin === destination ? "620" : "0"} style={{ transition: 'all 0.8s ease' }} />
            {stations.map((st, i) => {
              const cx = 50 + i * 120;
              const isSelected = st === origin || st === destination;
              return (
                <g key={st} transform={`translate(${cx}, 40)`}>
                  <circle r={isSelected ? "9" : "5"} fill={isSelected ? accentColor : "var(--paper)"} stroke={accentColor} strokeWidth="3" />
                  <text y="-16" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10px" fill={isSelected ? accentColor : "var(--text-secondary)"} fontWeight={isSelected ? 700 : 400}>
                    {st}
                  </text>
                  <text y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9px" fill="var(--text-muted)">
                    T-1{i + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            <div>
              ESTIMATED TIME: <span style={{ color: accentColor, fontWeight: 700 }}>{travelMinutes} MIN</span>
            </div>
            <div>
              NEXT DEPARTURE: <span style={{ color: 'var(--network-green)', fontWeight: 600 }}>IN 2 MIN (HEADWAY 90s)</span>
            </div>
            <div>
              ACCESSIBILITY: <span style={{ color: 'var(--ink)' }}>{wheelchairOnly ? 'LEVEL BOARDING CERTIFIED' : 'STANDARD'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'atlas') {
    const categories = ['All', 'Ceramics', 'Textiles', 'Metalwork', 'Cartography'];
    const eras = ['All', '14th C', '16th C', '18th C', '20th C'];
    const items = [
      { id: 'A01', title: 'Cobalt Celadon Bowl', era: '14th C', cat: 'Ceramics', color: '#2454FF' },
      { id: 'A02', title: 'Gilded Silk Brocade', era: '16th C', cat: 'Textiles', color: '#F4D65B' },
      { id: 'A03', title: 'Astrolabe Brass Dial', era: '16th C', cat: 'Metalwork', color: '#FF6037' },
      { id: 'A04', title: 'Baltic Sea Navigation Chart', era: '18th C', cat: 'Cartography', color: '#826CFF' },
      { id: 'A05', title: 'Viking Inscribed Armring', era: '14th C', cat: 'Metalwork', color: '#30312F' },
      { id: 'A06', title: 'Flemish Wool Tapestry', era: '16th C', cat: 'Textiles', color: '#A53030' },
    ].filter(i => (selectedTag === 'All' || i.cat === selectedTag) && (selectedEra === 'All' || i.era === selectedEra));

    return (
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--paper)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor }}>PROTOTYPE 02 / MULTIDIMENSIONAL INDEX</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}>COLLECTION SPECTRUM EXPLORER</div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
            RECORDS INDEXED: 9,420
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>MATERIAL SPECTRUM</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedTag(c)}
                  style={{
                    padding: '4px 10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    backgroundColor: selectedTag === c ? accentColor : 'var(--canvas)',
                    color: selectedTag === c ? '#fff' : 'var(--ink)',
                    border: '1px solid var(--line)',
                    cursor: 'pointer'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>ERA FILTER</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {eras.map(e => (
                <button
                  key={e}
                  onClick={() => setSelectedEra(e)}
                  style={{
                    padding: '4px 10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    backgroundColor: selectedEra === e ? accentColor : 'var(--canvas)',
                    color: selectedEra === e ? '#fff' : 'var(--ink)',
                    border: '1px solid var(--line)',
                    cursor: 'pointer'
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtered objects preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid var(--line)', padding: '14px', backgroundColor: 'var(--canvas)', borderTop: `3px solid ${item.color}` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>{item.id} • {item.era}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, marginTop: '6px' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor, marginTop: '4px' }}>{item.cat}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === 'forge') {
    const calcCost = (material === 'Titanium T6' ? 42000 : 28000) + (armLength === '1200mm' ? 4500 : 3000);

    return (
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--paper)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor }}>PROTOTYPE 03 / PARAMETRIC ASSEMBLY ENGINE</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}>ROBOTIC ARM 3D CONFIGURATOR</div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--network-green)' }}>
            WASM CONSTRAINT SOLVER: 3.8ms
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ARM REACH</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['850mm', '1200mm', '1650mm'].map(l => (
                  <button
                    key={l}
                    onClick={() => setArmLength(l)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: `1px solid ${armLength === l ? accentColor : 'var(--line)'}`,
                      backgroundColor: armLength === l ? `${accentColor}12` : 'var(--canvas)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: armLength === l ? accentColor : 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>MATERIAL GRADE</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Titanium T6', 'Aerospace Al7075', 'Carbon Composite'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMaterial(m)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: `1px solid ${material === m ? accentColor : 'var(--line)'}`,
                      backgroundColor: material === m ? `${accentColor}12` : 'var(--canvas)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: material === m ? accentColor : 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>ACTUATION PAYLOAD</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Hydraulic 45kN', 'Direct Servo 20kN', 'High-Speed Harmonic'].map(a => (
                  <button
                    key={a}
                    onClick={() => setActuator(a)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: `1px solid ${actuator === a ? accentColor : 'var(--line)'}`,
                      backgroundColor: actuator === a ? `${accentColor}12` : 'var(--canvas)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: actuator === a ? accentColor : 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--canvas)', border: '1px solid var(--line)', padding: '24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>LIVE SAP BOM SPECIFICATION</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, color: 'var(--ink)' }}>
              <div>PART: <span style={{ color: accentColor }}>VGD-ROBO-TX4</span></div>
              <div>REACH: {armLength} (±0.02mm repeatable)</div>
              <div>SUBSTRATE: {material}</div>
              <div>DRIVE: {actuator}</div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--line)', fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>
                ESTIMATED UNIT: €{calcCost.toLocaleString()} EUR
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'current-grid') {
    const generationMW = gridMode === 'SOLAR_PEAK' ? '14,820 MW' : gridMode === 'WIND_GALE' ? '18,400 MW' : '9,200 MW';
    const frequencyHz = gridMode === 'SOLAR_PEAK' ? '50.02 Hz' : gridMode === 'WIND_GALE' ? '49.98 Hz' : '50.00 Hz';

    return (
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--paper)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor }}>PROTOTYPE 04 / CONTINENTAL TELEMETRY STREAM</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}>TRANSMISSION FREQUENCY & CURTAILMENT</div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: accentColor }}>
            GRID FREQUENCY: {frequencyHz}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {(['BASE', 'SOLAR_PEAK', 'WIND_GALE'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setGridMode(mode)}
              style={{
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                border: '1px solid var(--line)',
                backgroundColor: gridMode === mode ? accentColor : 'var(--canvas)',
                color: gridMode === mode ? '#fff' : 'var(--ink)',
                cursor: 'pointer'
              }}
            >
              SIMULATE {mode.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', border: '1px solid var(--line)', backgroundColor: 'var(--canvas)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>RENEWABLE GENERATION</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: accentColor, marginTop: '4px' }}>{generationMW}</div>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--line)', backgroundColor: 'var(--canvas)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>INTERCONNECT EXPORT</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginTop: '4px' }}>+3,420 MW → DK</div>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--line)', backgroundColor: 'var(--canvas)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>STORAGE CHARGING STATE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginTop: '4px' }}>84.2% (PUMPED HYDRO)</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'field-guide') {
    return (
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--paper)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor }}>PROTOTYPE 05 / DIGITAL ELEVATION RASTER</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}>TOPOGRAPHIC CONTOUR & BEACON MONITOR</div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--network-green)' }}>
            LORA BEACONS ONLINE: 14/14
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                CONTOUR INTERVAL RESOLUTION: {contourStep}m
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={contourStep}
                onChange={(e) => setContourStep(Number(e.target.value))}
                style={{ width: '100%', accentColor }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="shelter"
                checked={shelterStatus}
                onChange={(e) => setShelterStatus(e.target.checked)}
                style={{ accentColor }}
              />
              <label htmlFor="shelter" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                OVERLAY ALPINE SHELTER WATER & BUNK TELEMETRY
              </label>
            </div>
          </div>

          <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--canvas)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.6 }}>
            <div>SUMMIT ELEVATION: 2,844m</div>
            <div>TRAIL GRADIENT: 18.4% (CHALLENGING)</div>
            <div>SHELTER ROCHERS: {shelterStatus ? '6 BUNKS AVAILABLE • WATER ACTIVE' : 'HIDDEN'}</div>
            <div style={{ color: accentColor, marginTop: '8px' }}>OFFLINE TILE PACK: CACHED (4.2MB)</div>
          </div>
        </div>
      </div>
    );
  }

  // nexus
  return (
    <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--paper)', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accentColor }}>PROTOTYPE 06 / GRAPH CAMPUS WAYFINDER</span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}>MULTI-LEVEL INDOOR ACCESSIBILITY TOTEM</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: accentColor }}>
          SELECTED FLOOR: {floor}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['L1 (GROUND)', 'L2 (RESEARCH)', 'L3 (LECTURE)', 'L4 (OBSERVATORY)'].map((fl, i) => {
          const key = `L${i + 1}`;
          return (
            <button
              key={key}
              onClick={() => setFloor(key)}
              style={{
                flex: 1,
                padding: '8px',
                border: `1px solid ${floor === key ? accentColor : 'var(--line)'}`,
                backgroundColor: floor === key ? `${accentColor}12` : 'var(--canvas)',
                color: floor === key ? accentColor : 'var(--ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              {fl}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '20px', border: '1px solid var(--line)', backgroundColor: 'var(--canvas)', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.6 }}>
        <div>CAMPUS ZONE: NORTH POLYTECHNIC COMPLEX</div>
        <div>ACTIVE FLOOR MAP: {floor} • 14 LECTURE ROOMS • 2 ELEVATOR SHAFTS (ADA ACCESSIBLE)</div>
        <div style={{ color: 'var(--network-green)', marginTop: '8px' }}>REALTIME SENSOR: LECTURE HALL 204 VACANT (STUDY SPACE OPEN)</div>
      </div>
    </div>
  );
};
