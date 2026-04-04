export default function TopoBackground() {
  const paths = [
    'M0,50  C80,32  140,68  200,48  S320,28  400,44  S480,64  520,38',
    'M0,80  C60,60  120,100 180,75  S300,55  380,70  S460,90  520,60',
    'M0,110 C50,90  110,130 170,105 S290,85  370,100 S450,120 520,90',
    'M0,140 C70,120 130,155 190,135 S310,110 390,130 S470,150 520,118',
    'M0,170 C55,152 115,185 175,165 S295,140 375,162 S455,180 520,150',
  ]
  return (
    <div className="topo-bg">
      <svg width="520" height="200" viewBox="0 0 520 200" fill="none">
        {paths.map((d, i) => (
          <path key={i} d={d} stroke="#8a7a60" strokeWidth="1" fill="none" opacity={0.6 - i * 0.08}/>
        ))}
      </svg>
    </div>
  )
}