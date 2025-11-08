// Minimal type declarations for lucide-react to satisfy TypeScript when
// automatic resolution fails in the editor/TS server.
// This file provides basic types for the icons you use. It's a safe
// temporary fix; the package ships full types in node_modules and this
// file can be removed once the TS server recognizes them.
import * as React from 'react';

type IconComponent = React.ForwardRefExoticComponent<any>;

declare module 'lucide-react' {
  export const Menu: IconComponent;
  export const X: IconComponent;
  export const Github: IconComponent;
  export const Linkedin: IconComponent;
  export const Mail: IconComponent;
  export const Code: IconComponent;
  export const Database: IconComponent;
  export const Globe: IconComponent;
  export const Cpu: IconComponent;
  export const Layers: IconComponent;
  export const Network: IconComponent;
  export const Server: IconComponent;
  export const Terminal: IconComponent;
  export const Coffee: IconComponent;
  export const Utensils: IconComponent;
  export const Moon: IconComponent;
  export const Sun: IconComponent;
  const icons: { [key: string]: IconComponent };
  export default icons;
}
