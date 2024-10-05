const admin = require('firebase-admin');
const express = require('express');
const server = express();
const cors = require('cors');
const { getFirestore } = require('firebase-admin/firestore');

// Khởi tạo Firebase Admin SDK với service account key
const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
server.use(cors()); // Để cho phép các yêu cầu từ frontend
const db = getFirestore();
app.use(cors());
app.use(express.json()); // Middleware để xử lý dữ liệu JSON

// API endpoint để lấy danh sách người dùng
app.get('/list-users', async (req, res) => {
    try {
        // Lấy danh sách người dùng, tối đa 1000 người dùng
        const listUsersResult = await admin.auth().listUsers(1000);

        // Định dạng dữ liệu người dùng
        const users = listUsersResult.users.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Không có tên hiển thị',
            lastLogin: user.tokensValidAfterTime || null,
            status: user.disabled ? 'Disabled' : 'Enabled',
            // lastActive: user.tokensValidAfterTime || userData.lastLogin,

        }));

        // Ghi thông tin người dùng vào Firestore
        const batch = db.batch(); // Sử dụng batch để ghi nhiều tài liệu cùng một lúc
        users.forEach(user => {
            const userRef = db.collection('users').doc(user.uid); // Tạo reference đến tài liệu
            batch.set(userRef, {
                email: user.email,
                displayName: user.displayName,
                lastLogin: user.lastLogin,
                status: user.status,
            }); // Ghi dữ liệu người dùng vào Firestore
        });
        await batch.commit(); // Xác nhận batch

        res.json(users); // Trả về danh sách người dùng
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        res.status(500).send('Đã xảy ra lỗi khi lấy danh sách người dùng');
    }
});

app.post('/toggle-user-status', async (req, res) => {
    const { uid, currentStatus } = req.body; // Nhận UID và trạng thái hiện tại từ yêu cầu

    try {
        // Cập nhật trạng thái người dùng trong Firebase Authentication
        await admin.auth().updateUser(uid, { disabled: currentStatus === 'Enabled' }); // Nếu hiện tại là 'Enabled', thì đặt là 'Disabled'

        res.send('Trạng thái người dùng đã được cập nhật thành công.');
    } catch (error) {
        console.error('Lỗi khi thay đổi trạng thái người dùng:', error);
        res.status(500).send('Đã xảy ra lỗi khi thay đổi trạng thái người dùng.');
    }
});


//Lấy danh sách người dùng đang hoạt động
app.get('/active-users', async (req, res) => {
    const activeUsers = [];
    const snapshot = await getDocs(collection(db, 'activeUsers'));

    snapshot.forEach(doc => {
        activeUsers.push(doc.data());
    });

    res.json(activeUsers);
});


// Khởi động server trên cổng 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
