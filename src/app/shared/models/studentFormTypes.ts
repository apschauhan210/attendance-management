// export class studentFormTypes {
//     public static Register = 'Register';
//     public static Edit = 'Edit';
// }

export type studentFormTypes = 'Register' | 'Edit';

export class formValues {
    public static readonly Register: studentFormTypes = 'Register';
    public static readonly Edit: studentFormTypes = "Edit";
}