import { useRef } from "react";
import { Canvas } from "@components/Canvas";
import { Flex } from "@chakra-ui/react";
import { Tools } from "@components/Tools";
import { useUndo } from "@components/Canvas/useUndo";
import { Zoom } from "@components/Tools/Zoom";

const App = () => {
    const ctxRef = useRef<CanvasRenderingContext2D>(null!);
    const { undo, redo, snapshot, clear, isDisableUndo, isDisableRedo } = useUndo(
        ctxRef.current
    );

    return (
        <Flex>
            <Tools
                handlers={{
                    undo,
                    redo,
                    clear,
                    isDisableUndo,
                    isDisableRedo,
                }}
            />

            <Zoom />
            <Canvas ctxRef={ctxRef} snapshot={snapshot} />
        </Flex>
    );
};

export default App;
