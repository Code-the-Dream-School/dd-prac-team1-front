import { ChangeEventHandler, forwardRef, useRef } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Image as ChakraImage,
  FormControl
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { AnimationVariants } from "../../utils/types";

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn"
    }
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut"
    }
  }
};

type Ref = HTMLDivElement;
type Props = {
  variants: AnimationVariants;
  backgroundImage: string;
};

type DropImageProps = {
  srcImage: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const PreviewImage = forwardRef<Ref, Props>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      {...props}
      ref={ref}
    />
  );
});

const DropImage = ({ srcImage, onChange }: DropImageProps) => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  const nativeFilePickerRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justifyContent="center">
      <AspectRatio width="sm" ratio={1}>
        <Box
          borderColor="green"
          borderStyle="dashed"
          borderWidth="2px"
          rounded="md"
          shadow="sm"
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: "md"
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover">
          <Box position="relative" height="100%" width="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column">
              {srcImage ? (
                <Box height="70%" position="relative">
                  <ChakraImage src={srcImage || ""} alt="recipeImage" />
                </Box>
              ) : (
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4">
                  <Box height="20" width="16" position="relative">
                    <PreviewImage
                      variants={first}
                      backgroundImage={`url(${require("./imagesPreview/uploadPicture3.jpg")})`}
                    />
                    <PreviewImage
                      variants={second}
                      backgroundImage={`url(${require("./imagesPreview/uploadPicture2.jpg")})`}
                    />
                    <PreviewImage
                      variants={third}
                      backgroundImage={`url(${require("./imagesPreview/uploadPicture1.jpg")})`}
                    />
                  </Box>
                </Stack>
              )}
              <Stack p="8" textAlign="center" spacing="1">
                <FormControl>
                  <Input
                    ref={nativeFilePickerRef}
                    type="file"
                    name="recipeImage"
                    placeholder="Choose img"
                    accept="image/png, image/jpeg, image/avif"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    onDragEnter={startAnimation}
                    onDragLeave={stopAnimation}
                    onChange={onChange}
                  />
                  <Button
                    fontSize="lg"
                    fontWeight="bold"
                    onClick={() => {
                      if (nativeFilePickerRef.current === null) return;
                      nativeFilePickerRef.current.click();
                    }}>
                    Сlick to upload
                  </Button>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </Box>
      </AspectRatio>
    </Flex>
  );
};

export default DropImage;
