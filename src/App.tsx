/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorldProvider } from './WorldContext';
import { Background } from './components/Background';
import { AgentView } from './components/AgentView';
import { HUD } from './components/HUD';
import { InteractionLayer } from './components/InteractionLayer';

export default function App() {
  return (
    <WorldProvider>
      <div className="relative w-full h-screen overflow-hidden bg-black select-none">
        <Background />
        <AgentView />
        <HUD />
        <InteractionLayer />
      </div>
    </WorldProvider>
  );
}
