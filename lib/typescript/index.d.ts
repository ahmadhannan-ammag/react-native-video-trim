export interface EditorConfig {
    saveToPhoto?: boolean;
    removeAfterSavedToPhoto?: boolean;
    maxDuration?: number;
    cancelButtonText?: string;
    saveButtonText?: string;
    enableCancelDialog?: boolean;
    cancelDialogTitle?: string;
    cancelDialogMessage?: string;
    cancelDialogCancelText?: string;
    cancelDialogConfirmText?: string;
    enableSaveDialog?: boolean;
    saveDialogTitle?: string;
    saveDialogMessage?: string;
    saveDialogCancelText?: string;
    saveDialogConfirmText?: string;
    trimmingText?: string;
}
/**
 * Delete a file
 *
 * @param {string} videoPath: absolute non-empty file path to edit
 * @param {EditorConfig} config: editor configuration
 * @returns {void} A **Promise** which resolves `void`
 */
export declare function showEditor(filePath: string, config?: EditorConfig): Promise<void>;
/**
 * Delete a file
 *
 * @param {string} filePath: absolute non-empty file path to check if editable
 * @returns {Promise} A **Promise** which resolves `true` if editable
 */
export declare function isValidVideo(filePath: string): Promise<boolean>;
/**
 * Clean output files generated at all time
 *
 * @returns {Promise<string[]>} A **Promise** which resolves to array of files
 */
export declare function listFiles(): Promise<string[]>;
/**
 * Clean output files generated at all time
 *
 * @returns {Promise} A **Promise** which resolves to number of deleted files
 */
export declare function cleanFiles(): Promise<number>;
/**
 * Delete a file
 *
 * @param {string} filePath: absolute non-empty file path to delete
 * @returns {Promise} A **Promise** which resolves `true` if successful
 */
export declare function deleteFile(filePath: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map