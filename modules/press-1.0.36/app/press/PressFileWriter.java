package press;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import play.exceptions.UnexpectedException;
import play.vfs.VirtualFile;
import press.io.CompressedFile;
import press.io.FileIO;

public class PressFileWriter {
    static final String PRESS_SIGNATURE = "press-1.0";
    static final String PATTERN_TEXT = "^/\\*" + PRESS_SIGNATURE + "\\*/$";
    static final Pattern HEADER_PATTERN = Pattern.compile(PATTERN_TEXT);

    private Compressor compressor;

    public PressFileWriter(Compressor compressor) {
        this.compressor = compressor;
    }

    /**
     * Create a compressed archive from the given component files and write it
     * to the given file.
     */
    public CompressedFile writeCompressedFile(List<FileInfo> componentFiles, CompressedFile file) {
        long timeStart = System.currentTimeMillis();

        // If the file is being written by another thread, startWrite() will
        // block until it is complete and then return null
        Writer writer = file.startWrite();
        if (writer == null) {
            PressLogger.trace("Compressed file was generated by another thread");
            return file;
        }

        try {
            writer.append(createFileHeader());

            for (FileInfo componentFile : componentFiles) {
                compress(componentFile, writer);
            }

            long timeAfter = System.currentTimeMillis();
            PressLogger.trace("Time to compress files for '%s': %d milli-seconds",
                    FileIO.getFileNameFromPath(file.name()), (timeAfter - timeStart));
        } catch (Exception e) {
            throw new UnexpectedException(e);
        } finally {
            // Note that this flushes and closes the writer as well
            file.close();
        }
        
        return file;
    }

    private void compress(FileInfo fileInfo, Writer out) throws Exception {
        String fileName = fileInfo.file.getName();
        if (fileInfo.compress) {
            PressLogger.trace("Compressing %s", fileName);
        } else {
            PressLogger.trace("Adding already compressed file %s", fileName);
        }
        compressor.compress(fileInfo.file, out, fileInfo.compress);
    }

    public static String createFileHeader() {
        return "/*" + PRESS_SIGNATURE + "*/\n";
    }

    public static boolean hasPressHeader(File file) {
        try {
            if (!file.exists()) {
                return false;
            }
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String firstLine = reader.readLine();
            Matcher matcher = HEADER_PATTERN.matcher(firstLine);
            if (matcher.matches()) {
                return true;
            }
            return false;
        } catch (IOException e) {
            return false;
        }
    }
}
